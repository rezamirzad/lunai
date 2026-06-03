'use client';

import React, { useState, KeyboardEvent } from 'react';
import { Typography } from '@workspace/ui';
import { cn } from '@workspace/shared';

export interface KeywordInputProps {
  /** Array of keywords */
  value: string[];
  /** Callback triggered when keywords change */
  onChange: (value: string[]) => void;
  /** Optional label for the input */
  label?: string;
  /** Optional placeholder when no keywords are present */
  placeholder?: string;
  /** Optional additional styling */
  className?: string;
}

/**
 * KeywordInput Component
 * 
 * Implements Task 4.1: Keyword Input Component.
 * Provides an Apple-style, high-contrast interface for managing keyword tags.
 * 
 * Aesthetics:
 * - Minimalist, high-contrast design
 * - Rounded "pills" for existing keywords
 * - Clean transitions and focus states
 */
export const KeywordInput: React.FC<KeywordInputProps> = ({
  value,
  onChange,
  label = "Discovery Keywords",
  placeholder = "Add keyword...",
  className,
}) => {
  const [inputValue, setInputValue] = useState("");

  const addKeyword = (keyword: string) => {
    const keywordsToAdd = keyword
      .split(',')
      .map((k) => k.trim())
      .filter((k) => k !== "" && !value.includes(k));

    if (keywordsToAdd.length > 0) {
      onChange([...value, ...keywordsToAdd]);
    }
    setInputValue("");
  };

  const removeKeyword = (keywordToRemove: string) => {
    onChange(value.filter((k) => k !== keywordToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addKeyword(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && value.length > 0) {
      removeKeyword(value[value.length - 1]);
    }
  };

  return (
    <div className={cn("flex flex-col gap-2 w-full", className)}>
      {label && <Typography variant="label">{label}</Typography>}
      <div className={cn(
        "flex flex-wrap gap-2 p-2 border border-border-primary bg-background-primary rounded-2xl transition-all duration-300 focus-within:border-brand-primary min-h-[56px] items-center group",
        "hover:border-border-secondary"
      )}>
        {value.map((keyword) => (
          <span
            key={keyword}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-brand-primary text-black text-[11px] font-black rounded-full uppercase tracking-widest animate-in fade-in zoom-in duration-300"
          >
            {keyword}
            <button
              type="button"
              onClick={() => removeKeyword(keyword)}
              className="hover:opacity-70 transition-opacity"
              aria-label={`Remove ${keyword}`}
            >
              <svg 
                width="10" 
                height="10" 
                viewBox="0 0 10 10" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  d="M1 1L9 9M9 1L1 9" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={() => addKeyword(inputValue)}
          placeholder={value.length === 0 ? placeholder : ""}
          className="flex-1 bg-transparent border-none outline-none text-text-primary placeholder:text-text-muted min-w-[120px] py-2 px-2 text-sm"
        />
      </div>
    </div>
  );
};
