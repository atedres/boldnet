'use client';

import React from 'react';
import { Textarea } from './textarea';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

// Fallback to a simple textarea since react-quill is not compatible with React 19
export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <Textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="min-h-[120px]"
    />
  );
}
