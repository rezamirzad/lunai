import React from 'react';
import { cn } from '@workspace/shared';
import { Button } from './Button';

interface UserAuthProps {
  label: string;
  onClick?: () => void;
  className?: string;
  isLoggedIn?: boolean;
  userName?: string;
}

export const UserAuth = ({ 
  label, 
  onClick, 
  className, 
  isLoggedIn = false, 
  userName 
}: UserAuthProps) => {
  if (isLoggedIn) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <span className="text-[10px] md:text-xs font-medium text-gray-400 uppercase tracking-widest">
          {userName}
        </span>
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-xs font-black text-white">
          {userName?.charAt(0).toUpperCase() || 'U'}
        </div>
      </div>
    );
  }

  return (
    <Button 
      variant="outline" 
      size="sm" 
      onClick={onClick}
      className={cn("border-blue-500/30 hover:border-blue-500 text-blue-500 hover:text-white hover:bg-blue-500", className)}
    >
      {label}
    </Button>
  );
};

UserAuth.displayName = 'UserAuth';
