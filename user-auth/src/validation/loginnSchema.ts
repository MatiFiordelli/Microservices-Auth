import { z } from 'zod'

const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*+]).{8,16}$/
const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(?: [A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/

export const loginSchema = z.object({
    email: z
        .string()
        .email({message: 'Invalid email'})
        .regex(emailRegex, {message: 'Invalid email format'})
        .refine(email=>email.trim()),
    password: z
        .string()
        .min(8, {message: 'Password must be at least 8 characters long'})
        .max(16, {message: 'Password must be at most 16 characters long'})
        .regex(passwordRegex, {message: 'Password must contain at least one uppercase letter, on lowercase letter, one number and one special character'}),
    name: z
        .string()
        .min(2, {message: 'Name must be at least 2 characters long'})
        .max(50, {message: 'Name must be at most 50 characters long'})
        .regex(nameRegex, {message: 'Name must contain only letters'})
        .refine(name=>name.trim()),
})