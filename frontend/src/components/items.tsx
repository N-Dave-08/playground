import React from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { UpdateItem } from '@/components/forms/update-item'

export type Item = {
    _id: string
    title: string
    description: string
    createdAt: Date
}

interface ItemProps {
    items: Item[]
    deleteItem: (id: string) => void
    updateItem: (updatedItem: Item) => void
}

export default function List({items, deleteItem, updateItem}: ItemProps) {
    return (
        <ScrollArea className='bg-slate-50 p-5 h-[500px] w-[800px] rounded-lg'>
            {
                items.map((item, index) => (
                    <div key={item._id}>
                        <div className='flex items-center gap-4'>
                            <p className='capitalize font-bold'>{item.title}</p>
                            <p className="text-xs">{new Date(item.createdAt).toLocaleString()}</p>
                        </div>
                        <div>
                            <p>{item.description}</p>
                        </div>
                        <div className='space-x-2'>
                        <UpdateItem item={item} onUpdate={updateItem}/>
                        <Button variant={'destructive'} size={'icon'} onClick={() => deleteItem(item._id)}>
                            <Trash />
                        </Button>
                        </div>
                        {
                            index < items.length - 1 && (<Separator className='my-3' />)
                        }
                    </div>
                ))
            }
        </ScrollArea>
    )
}
