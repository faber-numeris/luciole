import {z} from "zod";

const email = z.string().email('Please enter a valid email address');

const password = z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character');

export {email, password};