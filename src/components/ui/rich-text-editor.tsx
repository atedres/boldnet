'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css'; // import styles
import { Skeleton } from './skeleton';

const ReactQuill = dynamic(
  () => import('react-quill'), 
  { 
    ssr: false,
    loading: () => <RichTextEditor.Skeleton />
  }
);

const modules = {
  toolbar: [
    [{ 'header': [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link'],
    ['clean']
  ],
};

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function RichTextEditor({ value, onChange, placeholder }: RichTextEditorProps) {
  return (
    <div className="bg-background rounded-md h-full flex flex-col">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        modules={modules}
        className="[&_.ql-container]:flex-grow [&_.ql-container]:min-h-0 [&_.ql-container]:flex [&_.ql-editor]:flex-grow"
      />
    </div>
  );
}

RichTextEditor.Skeleton = function RichTextEditorSkeleton() {
    return (
        <div className="rounded-md border border-input h-full p-2">
            <div className="flex items-center gap-2 border-b pb-2 mb-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-12" />
                <Skeleton className="h-6 w-12" />
            </div>
            <Skeleton className="h-8 w-full mb-2" />
            <Skeleton className="h-8 w-3/4" />
        </div>
    )
}
