'use client';

import React from 'react';
import { 
  Zap, Compass, Target, Lightbulb, BarChart3, HelpCircle,
  PenTool, Code, Megaphone, Paintbrush, Camera, Video,
  Server, Cloud, Database, ShieldCheck, Settings, Rocket,
  Users, Briefcase, MessageSquare, Globe, Award,
  Film, Scissors, Send, Globe2, ThumbsUp, Heart,
  MousePointerClick, RefreshCw, CircleDollarSign, TrendingUp, UserPlus,
  PenSquare, Lamp, Link as LinkIcon
} from 'lucide-react';

const iconMap: Record<string, React.FC<any>> = {
  Zap, Compass, Target, Lightbulb, BarChart3, HelpCircle,
  PenTool, Code, Megaphone, Paintbrush, Camera, Video,
  Server, Cloud, Database, ShieldCheck, Settings, Rocket,
  Users, Briefcase, MessageSquare, Globe, Award,
  Film, Scissors, Send, Globe2, ThumbsUp, Heart,
  MousePointerClick, RefreshCw, CircleDollarSign, TrendingUp, UserPlus,
  PenSquare, Lamp, LinkIcon
};

interface DynamicIconProps extends React.ComponentProps<typeof HelpCircle> {
  iconName: string;
}

export const DynamicIcon = ({ iconName, ...props }: DynamicIconProps) => {
  const IconComponent = iconMap[iconName] || HelpCircle;
  return <IconComponent {...props} />;
};