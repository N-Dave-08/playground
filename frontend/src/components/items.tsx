import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { UpdateItem } from "@/components/forms/update-item"

export type Item = {
    _id: string
    title: string
    description: string
    createdAt: Date
}

interface ItemsProps {
    items: Item[]
    deleteItem: (id: string) => void
}

export default function Items({ items, deleteItem }: ItemsProps) {
    return (
        <ScrollArea className='bg-slate-100 rounded-xl p-5 w-1/2 h-5/6'>
            {
                items.map((item, index) => (
                    <div key={item._id}>
                        <div className='mb-3'>
                            <div className='flex items-center gap-3'>
                                <p className='font-bold capitalize'>{item.title}</p>
                                <p className='text-xs'>{new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                            <p>{item.description}</p>
                        </div>
                        <div className='flex gap-3'>
                            <UpdateItem item={item}/>
                            <Button
                                variant={'destructive'}
                                size={'icon'}
                                onClick={() => deleteItem(item._id)}
                            >
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
