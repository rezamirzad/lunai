"use client";

import { useEffect, useRef } from 'react';
import { incrementPostViews } from '@/app/actions';

interface ViewTrackerProps {
  slug: string;
}

export const ViewTracker: React.FC<ViewTrackerProps> = ({ slug }) => {
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current) {
      incrementPostViews(slug);
      tracked.current = true;
    }
  }, [slug]);

  return null;
};
