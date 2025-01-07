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
import { Textarea } from "@/components/ui/textarea"
import { Item } from "@/components/items"
import axios from "axios"
import { useState } from "react"

interface UpdateItemProps {
    item: Item
    onUpdate: (updatedItem: Item) => void
}

export function UpdateItem({item, onUpdate}: UpdateItemProps) {

    const [title, setTitle] = useState(item.title)
    const [description, setDescription] = useState(item.description)
    const [open, setOpen] = useState<boolean>(false)

    const handleUpdate = async () => {
        try {
            const res = await axios.put(`http://localhost:5000/items/${item._id}`, {
                title,
                description
            })
            onUpdate(res.data)
            setOpen(false)
        } catch (error) {
            console.error("error updating item", error)
        }
    }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size={'sm'}>Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Item</DialogTitle>
          <DialogDescription>
            Make changes to your item here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Title
            </Label>
            <Input id="name" className="col-span-3" value={title} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Description
            </Label>
            <Textarea className="col-span-3" value={description} onChange={(e) => setDescription(e.target.value)}/>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpdate}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
