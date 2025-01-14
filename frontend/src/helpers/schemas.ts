import {z} from 'zod'

export const formSchema = z.object({
    title:
        z.string()
            .min(3, {
                message: "title must be at least 3 characters",
            }).max(20, {
                message: "title must not exceed 20 characters"
            }),
    description:
        z.string()
            .min(3, {
                message: "title must be at least 3 characters",
            }),
})