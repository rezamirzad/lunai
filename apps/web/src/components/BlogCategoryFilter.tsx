import React from 'react';

export interface BlogCategoryFilterProps {
  category: string;
  color?: string;
  active?: boolean;
  onClick?: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  Engineering: '#22C55E',
  Product: '#3B82F6',
  AI: '#A855F7',
  Changelog: '#F97316',
  General: '#14B8A6',
};

export const BlogCategoryFilter: React.FC<BlogCategoryFilterProps> = ({
  category,
  color,
  active = false,
  onClick,
}) => {
  const tagColor = color || CATEGORY_COLORS[category] || CATEGORY_COLORS.General;

  return (
    <button
      onClick={onClick}
      disabled={!onClick}
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest transition-colors ${
        onClick ? 'cursor-pointer hover:opacity-80' : 'cursor-default'
      }`}
      style={{
        backgroundColor: active ? tagColor : 'transparent',
        color: active ? '#000000' : tagColor,
        border: `1px solid ${tagColor}`,
      }}
    >
      {category}
    </button>
  );
};
