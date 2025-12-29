'use client';

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Skeleton } from './skeleton';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike',
  'list', 'bullet',
  'link',
];

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  const ReactQuill = useMemo(() => dynamic(() => import('react-quill'), { 
    ssr: false,
    loading: () => <Skeleton className="w-full h-[120px] rounded-md" />
  }), []);

  return (
    <div className="bg-background rounded-md">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        className="[&_.ql-editor]:min-h-[120px] [&_.ql-toolbar]:rounded-t-md [&_.ql-container]:rounded-b-md"
      />
    </div>
  );
}
