import {z} from "zod"

export const formSchema = z.object({
    title: z.string()
        .nonempty({
            message: 'Title is required.'
        })
        .min(3, {
            message: "Title must be at least 3 characters.",
        })
        .max(20, {
            message: "Title must not exceed 20 characters."
        }),
    description: z.string()
        .nonempty({
            message: 'Description is required.'
        })
        .min(3, {
            message: "Description must be at least 2 characters.",
        }),
})