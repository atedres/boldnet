'use client';

import React from 'react';
import * as Icons from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { DynamicIcon } from '@/components/ui/dynamic-icon';

// A curated list of icons suitable for services
const iconList: (keyof typeof Icons)[] = [
  'PenTool', 'Code', 'BarChart3', 'Megaphone', 'Paintbrush', 'Camera', 'Video',
  'Server', 'Cloud', 'Database', 'ShieldCheck', 'Settings', 'Rocket', 'Target',
  'Lightbulb', 'Users', 'Briefcase', 'MessageSquare', 'Zap', 'Globe', 'Award'
];

interface IconSelectProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function IconSelect({ value, onChange, label = 'Service Icon' }: IconSelectProps) {
  return (
    <div className="grid gap-2">
      <Label>{label}</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger>
          <div className="flex items-center gap-2">
            {value && <DynamicIcon iconName={value as keyof typeof Icons} className="h-4 w-4" />}
            <SelectValue placeholder="Select an icon" />
          </div>
        </SelectTrigger>
        <SelectContent>
          {iconList.map((iconName) => (
            <SelectItem key={iconName} value={iconName}>
              <div className="flex items-center gap-2">
                <DynamicIcon iconName={iconName} className="h-4 w-4" />
                <span>{iconName}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
