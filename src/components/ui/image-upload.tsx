'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, UploadCloud, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  className?: string;
}

// Configuration for Cloudinary - These are public and safe to have in client-side code.
const CLOUDINARY_CLOUD_NAME = 'ddbj70ziv';
const CLOUDINARY_UPLOAD_PRESET = 'boldnet_unsigned';
const CLOUDINARY_UPLOAD_URL = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;


export function ImageUpload({ value, onChange, label, className }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Check for file size if necessary
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
            variant: 'destructive',
            title: 'File too large',
            description: 'Image size cannot exceed 5MB.',
        });
        return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await fetch(CLOUDINARY_UPLOAD_URL, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error('Upload failed');
        }

        const data = await response.json();
        
        onChange(data.secure_url);
        toast({ title: 'Image Uploaded', description: 'Your image has been successfully uploaded.' });

    } catch (error) {
         console.error('Error uploading to Cloudinary:', error);
         toast({
            variant: 'destructive',
            title: 'Upload Failed',
            description: 'An unknown error occurred while uploading the image.',
         });
    } finally {
        setIsUploading(false);
    }
  };

  const clearImage = () => {
    onChange('');
  };

  return (
    <div className={cn("grid gap-2", className)}>
      {label && <Label>{label}</Label>}
      <div className="w-full">
        {value ? (
          <div className="relative group w-full h-40 rounded-md overflow-hidden border border-input">
            <Image src={value} alt="Uploaded image" layout="fill" objectFit="cover" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={clearImage}
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-md cursor-pointer hover:bg-accent hover:border-primary transition-colors">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {isUploading ? (
                <>
                  <Loader2 className="h-8 w-8 mb-3 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">Uploading...</p>
                </>
              ) : (
                <>
                  <UploadCloud className="h-8 w-8 mb-3 text-muted-foreground" />
                  <p className="mb-2 text-sm text-muted-foreground">
                    <span className="font-semibold text-primary">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                </>
              )}
            </div>
            <Input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept="image/png, image/jpeg, image/gif"
              disabled={isUploading}
            />
          </label>
        )}
      </div>
    </div>
  );
}
