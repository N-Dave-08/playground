'use client'

import React from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Item } from '@/components/items'
import axios from 'axios'
import { formSchema } from '@/helpers/schemas'
interface AddItemProps {
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export default function AddItem({ setItems }: AddItemProps) {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            description: "",
        },
    })

    const { reset } = form

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const res = await axios.post('http://localhost:5000/items', values)
            console.log(res.data)
            setItems((prevItems) => [...prevItems, res.data])
            reset()
        } catch (error) {
            console.error("error adding item", error)
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 p-5 bg-gray-50 dark:bg-black rounded-lg">

                {/* TITLE */}
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="enter title here..."
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                write any title
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                {/* DESCRIPTION */}
                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="enter description here..."
                                    {...field} />
                            </FormControl>
                            <FormDescription>
                                write any description
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    )
}
