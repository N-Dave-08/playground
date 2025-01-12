import { z } from 'zod'

export const formSchema = z.object({
    title: z.string()
        .min(3, {
            message: "title must be at least 2 characters.",
        })
        .max(10, {
            message: "title must not exceed 10 characters"
        }),
    description: z.string()
        .min(3, {
            message: "description must be at least 2 characters.",
        }),
})