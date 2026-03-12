import { z } from 'zod';
import { email, password } from '@/schemas/commonSchemas.ts';




export const registerSchema = z.object({
    email: email,
    password: password,
    confirmPassword: password,
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
