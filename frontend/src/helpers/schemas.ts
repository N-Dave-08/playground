import {z} from "zod"

export const formSchema = z.object({
    title: 
    z.string()
    .min(3, {
        message: "Username must be at least 3 characters.",
    }).max(10, {
        message: "Username must not exceed 10 letters."
    }),
    description: 
    z.string()
    .min(3, {
        message: "Description must be at least 3 characters.",
    }),
})