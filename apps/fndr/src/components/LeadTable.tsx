'use client';

import React from 'react';
import { Card, Typography, Grid, Input } from '@workspace/ui';
import { cn } from '@workspace/shared';

export interface Lead {
  id: string;
  platform: 'linkedin' | 'reddit';
  sourceUrl: string;
  rawContent: string;
  metadata: {
    postDate?: string;
    engagement?: {
      likes?: number;
      comments?: number;
      shares?: number;
    };
    tags?: string[];
  };
  authorMetadata: {
    name?: string;
    handle?: string;
    avatar?: string;
    bio?: string;
    profileLink?: string;
  };
  status: string;
  relevanceScore?: number;
  aiAnalysis?: {
    summary?: string;
    painPoints?: string[];
    intent?: 'high' | 'medium' | 'low';
    sentiment?: string;
    suggestedReply?: string;
    actionItems?: string[];
  };
}

interface LeadTableProps {
  leads: Lead[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  className?: string;
}

/**
 * LeadTable Component
 * 
 * Implements Task 4.2: AI-Analyzed DataTable.
 * Displays leads as "Modular cards" with AI insights and multi-selection support.
 * 
 * Aesthetics:
 * - Minimalist, Apple-style design
 * - High-contrast text
 * - Clean spacing and modular layout
 */
export const LeadTable: React.FC<LeadTableProps> = ({
  leads,
  selectedIds,
  onSelectionChange,
  className,
}) => {
  const toggleSelection = (id: string) => {
    if (selectedIds.includes(id)) {
      onSelectionChange(selectedIds.filter((selectedId) => selectedId !== id));
    } else {
      onSelectionChange([...selectedIds, id]);
    }
  };

  const toggleAll = () => {
    if (selectedIds.length === leads.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(leads.map((lead) => lead.id));
    }
  };

  const getIntentColor = (intent?: string) => {
    switch (intent) {
      case 'high':
        return 'text-brand-primary';
      case 'medium':
        return 'text-yellow-500';
      case 'low':
        return 'text-zinc-500';
      default:
        return 'text-text-muted';
    }
  };

  if (leads.length === 0) {
    return (
      <div className={cn("text-center py-20 border border-dashed border-border-primary rounded-3xl", className)}>
        <Typography variant="body" className="text-text-muted">
          No leads found. Start discovery to see results.
        </Typography>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <div className="flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <input
            type="checkbox"
            className="w-5 h-5 rounded border-border-primary bg-background-secondary text-brand-primary focus:ring-brand-primary"
            checked={selectedIds.length === leads.length && leads.length > 0}
            onChange={toggleAll}
          />
          <Typography variant="label" className="mb-0">
            Select All ({selectedIds.length}/{leads.length})
          </Typography>
        </div>
      </div>

      <Grid cols={1} gap={6} className="md:grid-cols-1 lg:grid-cols-1">
        {leads.map((lead) => (
          <Card
            key={lead.id}
            padding="lg"
            bordered
            className={cn(
              "group relative border-border-primary/50 hover:border-brand-primary transition-all duration-500",
              selectedIds.includes(lead.id) && "border-brand-primary bg-background-tertiary/30"
            )}
          >
            <div className="flex gap-6 items-start">
              {/* Checkbox */}
              <div className="pt-1">
                <input
                  type="checkbox"
                  className="w-5 h-5 rounded border-border-primary bg-background-secondary text-brand-primary focus:ring-brand-primary cursor-pointer"
                  checked={selectedIds.includes(lead.id)}
                  onChange={() => toggleSelection(lead.id)}
                />
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <a 
                      href={lead.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="transition-opacity hover:opacity-80"
                    >
                      <Typography variant="badge" className={cn(
                        "px-2 py-0.5 rounded-sm bg-background-tertiary cursor-pointer",
                        lead.platform === 'linkedin' ? 'text-blue-400' : 'text-orange-400'
                      )}>
                        {lead.platform}
                      </Typography>
                    </a>
                    <a 
                      href={lead.sourceUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white font-bold tracking-tight hover:text-brand-primary transition-colors flex items-center gap-2 group/link"
                    >
                      @{lead.authorMetadata.handle || lead.authorMetadata.name}
                      <svg 
                        className="w-3 h-3 opacity-0 group-hover/link:opacity-100 transition-opacity" 
                        viewBox="0 0 24 24" 
                        fill="none" 
                        stroke="currentColor" 
                        strokeWidth="3" 
                        strokeLinecap="round" 
                        strokeLinejoin="round"
                      >
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  </div>
                  
                  {lead.relevanceScore !== undefined && (
                    <div className="flex items-center gap-2">
                      <Typography variant="label" className="mb-0">Relevance</Typography>
                      <Typography className="text-brand-primary font-black text-xl">
                        {lead.relevanceScore}%
                      </Typography>
                    </div>
                  )}
                </div>

                <Typography className="text-text-primary text-lg leading-relaxed max-w-4xl line-clamp-3">
                  {lead.rawContent}
                </Typography>

                {/* AI Insights Section */}
                {lead.aiAnalysis && (
                  <div className="pt-6 border-t border-border-primary/20 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <Typography variant="label">AI Summary</Typography>
                      <Typography variant="body" className="text-zinc-300">
                        {lead.aiAnalysis.summary}
                      </Typography>
                    </div>
                    <div className="flex flex-col gap-4">
                      <div className="flex items-center justify-between md:justify-start md:gap-12">
                        <div className="flex flex-col gap-1">
                          <Typography variant="label">Intent</Typography>
                          <Typography className={cn("font-black uppercase tracking-widest text-sm", getIntentColor(lead.aiAnalysis.intent))}>
                            {lead.aiAnalysis.intent || 'Unknown'}
                          </Typography>
                        </div>
                        {lead.aiAnalysis.sentiment && (
                          <div className="flex flex-col gap-1">
                            <Typography variant="label">Sentiment</Typography>
                            <Typography className="text-zinc-400 font-medium capitalize">
                              {lead.aiAnalysis.sentiment}
                            </Typography>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Card>
        ))}
      </Grid>
    </div>
  );
};
