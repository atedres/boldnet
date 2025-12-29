'use server';
/**
 * @fileOverview A flow to generate an icon for a service.
 *
 * - generateIcon - A function that generates an icon based on a service title.
 * - GenerateIconInput - The input type for the generateIcon function.
 * - GenerateIconOutput - The return type for the generateIcon function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const GenerateIconInputSchema = z.string();
export type GenerateIconInput = z.infer<typeof GenerateIconInputSchema>;

const GenerateIconOutputSchema = z.object({
  iconUrl: z.string().url(),
});
export type GenerateIconOutput = z.infer<typeof GenerateIconOutputSchema>;

export async function generateIcon(
  input: GenerateIconInput
): Promise<GenerateIconOutput> {
  return generateIconFlow(input);
}

const generateIconFlow = ai.defineFlow(
  {
    name: 'generateIconFlow',
    inputSchema: GenerateIconInputSchema,
    outputSchema: GenerateIconOutputSchema,
  },
  async (serviceTitle) => {
    const { media } = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: `Generate a single, simple, modern, flat, minimalist icon for a service called "${serviceTitle}".
      The icon should be a vector-style graphic.
      It must have a completely transparent background.
      The main color of the icon should be black.
      Do not include any text.
      The output format must be a PNG.`,
      config: {
        aspectRatio: '1:1',
      },
    });

    if (!media.url) {
      throw new Error('Image generation failed to return a data URI.');
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(media.url, {
      folder: 'boldnet-digital-icons',
      format: 'png',
    });

    return { iconUrl: result.secure_url };
  }
);
