import * as React from "react"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import axios from "axios"

export type Item = {
    _id: string
    name: string
    description: string
}

interface AddItemProps {
    setItems: React.Dispatch<React.SetStateAction<Item[]>>
}

export function AddItem({ setItems }: AddItemProps) {
    const [name, setName] = React.useState<string>('')
    const [description, setDescription] = React.useState<string>('')

    const handleSubmit = async () => {
        try {
            const res = await axios.post('http://localhost:5000/items', {
                name,
                description
            })
            setItems((prevItems) => [...prevItems, res.data])
            setName('')
            setDescription('')
        } catch (error) {
            console.error('error adding item', error)
        }
    }

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Add Item</CardTitle>
                <CardDescription>I do not know what to put here</CardDescription>
            </CardHeader>
            <CardContent>
                <form>
                    <div className="grid w-full items-center gap-4">
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name here..."
                            />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="description">Description</Label>
                            <Input
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Enter description here..."
                            />
                        </div>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button variant="outline"
                    onClick={() => {
                        setName('');
                        setDescription('')
                    }}>
                    Clear
                </Button>
                <Button onClick={handleSubmit}>Submit</Button>
            </CardFooter>
        </Card>
    )
}
