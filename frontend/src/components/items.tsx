import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { UpdateItem } from '@/components/forms/update-item'

export type Item = {
    _id: string
    title: string
    description: string
    createdAt: Date
}

interface ItemsProps {
    items: Item[]
    deleteItem: (id: string) => void
    updateItem: (updatedItem: Item) => void
}

export default function List({ items, deleteItem, updateItem }: ItemsProps) {
    return (
        <ScrollArea className='h-64 bg-slate-50 rounded-lg p-5 w-1/2'>
            {
                items.map((item, index) => (
                    <div key={item._id} >
                        <div className='my-3'>
                            <div className='flex gap-2 items-center'>
                                <h4 className='font-bold text-xl capitalize'>{item.title}</h4>
                                <p className='text-xs'>{new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                            <p>{item.description}</p>
                            <div className="flex gap-2">
                                <UpdateItem item={item} onUpdate={updateItem}/>
                                <Button size={'sm'} variant={'destructive'} onClick={() => deleteItem(item._id)}>Delete</Button>
                            </div>
                        </div>
                        {index < items.length - 1 && <Separator />}
                    </div>

                ))
            }
        </ScrollArea>
    )
}

