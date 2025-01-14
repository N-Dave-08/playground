import { Item } from '@/app/page'
import React from 'react'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { UpdateItem } from '@/components/forms/update-item'

interface ItemsProps {
    items: Item[]
    deleteItem: (id: string) => void
    updateItem: (updatedItem: Item) => void
}

export default function Items({ items, deleteItem, updateItem }: ItemsProps) {
    return (
        <div className='bg-slate-100 p-5 rounded-xl w-80 h-72 overflow-auto'>
            {
                items.map((item, index) => (
                    <div key={item._id}>
                        <div className='mb-2'>
                            <div className='flex items-center gap-2'>
                                <p className='capitalize font-bold'>{item.title}</p>
                                <p className='text-xs'>{new Date(item.createdAt).toLocaleString()}</p>
                            </div>
                            <p>{item.description}</p>
                        </div>
                        <div className='flex gap-2'>
                            <UpdateItem item={item} onUpdate={updateItem}/>
                            <Button size={'icon'} variant={'destructive'} onClick={() => deleteItem(item._id)}>
                                <Trash />
                            </Button>
                        </div>
                        {
                            index < items.length - 1 && (<Separator className='my-4' />)
                        }
                    </div>
                ))
            }
        </div>
    )
}
