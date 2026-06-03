'use client';

import React, { useState } from 'react';
import { Button } from '@workspace/ui';
import { cn } from '@workspace/shared';

interface AnalysisButtonProps {
  /** Array of lead IDs to analyze */
  leadIds: string[];
  /** Callback triggered when analysis completes successfully */
  onSuccess?: () => void;
  /** Optional additional styling */
  className?: string;
}

/**
 * AnalysisButton Component
 * 
 * Implements Task 3.3: Analysis Action Implementation.
 * Provides a clean, high-contrast button to trigger lead analysis via the Gemini API.
 * 
 * Aesthetics:
 * - Apple-style minimalist design (rounded, high-contrast)
 * - Neon UI Teal & Black color palette
 * - Clear loading state and interaction feedback
 */
export const AnalysisButton: React.FC<AnalysisButtonProps> = ({
  leadIds,
  onSuccess,
  className,
}) => {
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (leadIds.length === 0 || loading) return;

    setLoading(true);
    try {
      const response = await fetch('/apps/fndr/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer admin-token', // Mock Authorization header
        },
        body: JSON.stringify({ leadIds }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Analysis failed');
      }

      console.log('[AnalysisButton] Analysis completed successfully:', result);

      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('[AnalysisButton] Error during analysis:', error);
      // In a production environment, this should trigger a toast notification
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleAnalyze}
      disabled={loading || leadIds.length === 0}
      variant="primary"
      size="md"
      className={cn(
        'min-w-[140px] rounded-full shadow-lg shadow-brand-primary/10 hover:shadow-brand-primary/20 active:scale-95 transition-all',
        loading && 'opacity-80 cursor-wait',
        className
      )}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <svg 
            className="animate-spin h-4 w-4 text-black" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            ></circle>
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Analyzing...
        </span>
      ) : (
        'Run Analysis'
      )}
    </Button>
  );
};
