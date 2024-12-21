import * as React from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface UpdateItemProps {
    id: string;
    currentName: string;
    currentDescription: string;
    onSave: (updatedItem: { name: string; description: string }) => void;
}

export function UpdateItem({ id, currentName, currentDescription, onSave }: UpdateItemProps) {
    const [name, setName] = React.useState<string>(currentName);
    const [description, setDescription] = React.useState<string>(currentDescription);

    // Reset values when the dialog is opened
    React.useEffect(() => {
        setName(currentName);
        setDescription(currentDescription);
    }, [currentName, currentDescription]);

    // Dialog open/close state
    const [open, setOpen] = React.useState(false);

    // Close the dialog
    const closeDialog = () => setOpen(false);

    // Handle Save Button Click
    const handleSave = async () => {
        try {
            // Call the API to update the item
            const response = await axios.put(`http://localhost:5000/items/${id}`, {
                name,
                description,
            });

            // After successful update, trigger the onSave callback (passing the updated item)
            onSave(response.data);

            // Close the dialog after saving
            closeDialog();
        } catch (error) {
            console.error("Error updating item:", error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">Edit Item</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Details</DialogTitle>
                    <DialogDescription>
                        Make changes to your details here
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Description
                        </Label>
                        <Input
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="button" onClick={handleSave}>
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
