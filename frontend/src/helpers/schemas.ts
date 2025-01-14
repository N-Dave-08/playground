import {z} from "zod"

export const formSchema = z.object({
  title: z.string({required_error: 'Title is required'})
  .nonempty({message: 'Title is required'})
  .min(3, {
    message: "Title must be at least 3 characters.",
  }).max(20, {
    message: "Title mist not exceed 20 characters."
  }),
  description: z.string({required_error: 'Description is required'})
  .nonempty({message: 'Description is required'})
  .min(3, {
    message: "Description must be at least 3 characters.",
  }),
})