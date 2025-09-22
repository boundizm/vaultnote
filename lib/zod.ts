import { z } from 'zod';

// API Schemas
export const createNoteSchema = z.object({
  title: z.string().optional(),
  ciphertext: z.string(), // Base64 encoded
  iv: z.string(), // Base64 encoded
  maxReads: z.number().optional(),
  duration: z.number().optional(), // in minutes
  isProtected: z.boolean().optional(),
  encryptedKey: z.string().optional(), // Base64 encoded (for password protection)
  keyIv: z.string().optional(), // Base64 encoded (for password protection)
  salt: z.string().optional(), // Base64 encoded (for password protection)
  images: z.array(z.object({
    name: z.string(),
    data: z.string(), // Base64 encoded image
    size: z.number(),
  })).optional(),

  // Author information - allow null but validate as string if provided
  authorName: z.string().nullable().optional(),
  authorEmail: z.string().email().nullable().optional().or(z.literal('')),

  // View tracking - allow null but validate as number if provided
  maxViews: z.number().nullable().optional(),
});

export const getNoteSchema = z.object({
  id: z.string().cuid(),
});

export const deleteNoteSchema = z.object({
  id: z.string().cuid(),
  token: z.string().optional(),
});

export type CreateNoteInput = z.infer<typeof createNoteSchema>;
export type GetNoteInput = z.infer<typeof getNoteSchema>;
export type DeleteNoteInput = z.infer<typeof deleteNoteSchema>;
