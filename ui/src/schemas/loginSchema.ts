import { z } from 'zod';
import { email, password } from '@/schemas/commonSchemas.ts';

export const loginSchema = z.object({
    email: email,
    password: password,
});

export type LoginFormData = z.infer<typeof loginSchema>;