'use client';

import { NextStudio } from 'next-sanity/studio';
import config from '../../../../../sanity.config';
import { useEffect, useState } from 'react';

// Force dynamic rendering for Sanity Studio to ensure correct environment detection
export const dynamic = 'force-dynamic';

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Force background to white to avoid any site theme artifacts
    document.body.style.backgroundColor = '#ffffff';
    document.body.style.backgroundImage = 'none';
    
    return () => {
      // Clean up on unmount
      document.body.style.backgroundColor = '';
      document.body.style.backgroundImage = '';
    }
  }, []);

  if (!mounted) return <div className="h-screen w-full bg-white" />;

  return (
    <div className="h-screen w-full bg-white">
      <NextStudio config={config} />
    </div>
  );
}