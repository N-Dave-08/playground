import React from 'react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Trash, PenSquare } from 'lucide-react'
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

export default function Items({ items, deleteItem, updateItem }: ItemProps) {
    return (
        <ScrollArea className='bg-slate-50 rounded-lg p-5 w-96 h-[500px] overflow-auto'>
            {
                items.map((item, index) => (
                    <div key={item._id}>
                        <p className='font-semibold capitalize'>{item.title}</p>
                        <p>{item.description}</p>
                        <div className='space-x-2'>
                            <UpdateItem item={item} onUpdate={updateItem} />
                            <Button onClick={() => deleteItem(item._id)} variant={'destructive'} size={'sm'}>
                                <Trash />
                            </Button>
                        </div>
                        {
                            index < items.length - 1 && (<Separator className='my-4' />)
                        }
                    </div>
                ))
            }
        </ScrollArea>
    )
}
