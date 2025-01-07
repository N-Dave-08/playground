import { z } from 'zod'

export const formSchema = z.object({
    title: z.string().min(3, {
        message: "Title must be at least 3 characters long."
    }).max(10, {
        message: "Title must not exceed 10 characters."
    }),
    description: z.string().min(3, {
        message: "Description must be at least 3 characters long."
    }).max(50, {
        message: "Description must not exceed 50 characters."
    }),
})