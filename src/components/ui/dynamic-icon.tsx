'use client';

import * as Icons from 'lucide-react';
import { type LucideProps } from 'lucide-react';

interface DynamicIconProps extends LucideProps {
  iconName: keyof typeof Icons;
}

export const DynamicIcon = ({ iconName, ...props }: DynamicIconProps) => {
  const LucideIcon = Icons[iconName] as React.FC<LucideProps>;

  if (!LucideIcon) {
    // Return a default icon or null if the icon name is not found
    return <Icons.HelpCircle {...props} />;
  }

  return <LucideIcon {...props} />;
};
