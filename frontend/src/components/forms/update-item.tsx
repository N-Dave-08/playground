import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { formSchema } from "@/helpers/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Item } from "@/components/items"
import axios from "axios"
import { Textarea } from "../ui/textarea"

interface UpdateItemProps {
    item: Item
    onUpdate: (updatedItem: Item) => void
}

export function UpdateItem({ item, onUpdate }: UpdateItemProps) {
    const [open, setOpen] = useState<boolean>(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: item.title,
            description: item.description,
        }
    })

    const { handleSubmit, formState: { errors }, setValue } = form

    const handleUpdate = async (values: z.infer<typeof formSchema>) => {
        try {
            const res = await axios.put(`http://localhost:5000/items/${item._id}`, values)
            onUpdate(res.data)
            setOpen(false)
        } catch (error) {
            console.error('error updating an item', error)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Item</DialogTitle>
                    <DialogDescription>
                        Make changes to your item here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit(handleUpdate)}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">
                                Title
                            </Label>
                            <Input
                                id="title"
                                className="col-span-3"
                                {...form.register('title')}
                                aria-invalid={errors.title ? "true" : "false"}
                            />
                            <div></div>
                            {
                                errors.title && (
                                    <span className="text-red-500 text-sm col-span-3">{errors.title.message}</span>
                                )
                            }
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">
                                Description
                            </Label>
                            <Textarea
                                id="description"
                                className="col-span-3"
                                {...form.register('description')}
                                aria-invalid={errors.description ? "true" : "false"}
                            />
                            <div></div>
                            {
                                errors.description && (
                                    <span className="text-red-500 text-sm col-span-3">{errors.description.message}</span>
                                )
                            }
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">Save changes</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
