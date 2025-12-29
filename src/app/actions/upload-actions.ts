'use server';

import { uploadImage as uploadToCloudinary } from '@/lib/cloudinary';

export async function uploadImageAction(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
    const file = formData.get('image') as File;

    if (!file) {
        return { success: false, error: 'No image file provided.' };
    }
    
    // Check for file size if necessary
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        return { success: false, error: 'File size exceeds the 5MB limit.' };
    }

    try {
        const result = await uploadToCloudinary(file);
        return { success: true, url: result.secure_url };
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return { success: false, error: 'Failed to upload image.' };
    }
}
