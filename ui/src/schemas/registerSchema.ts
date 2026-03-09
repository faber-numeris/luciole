import {z} from 'zod';

const email = z.email('Please enter a valid email address');

const password = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');


export const registerSchema = z.object({
    email: email,
    password: password,
    confirmPassword: password,
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
});

export type RegisterFormData = z.infer<typeof registerSchema>;
