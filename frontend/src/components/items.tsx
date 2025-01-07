import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button';
import { UpdateItem } from '@/components/forms/update-item';

export type Item = {
    _id: string;
    title: string;
    description: string;
    createdAt: Date;
}

interface ItemsProps {
    items: Item[]
    deleteItem: (id: string) => void
    updateItem: (updatedItem: Item) => void
}

export default function Items({ items, deleteItem, updateItem }: ItemsProps) {

    return (
        <ScrollArea className="h-96">
            {
                items.map((item) => (
                    <li key={item._id} className='flex flex-col mb-4'>
                        <div className='flex items-center gap-2'>
                            <h4 className='capitalize font-bold'>{item.title}</h4>
                            <span className='text-xs'>{new Date(item.createdAt).toLocaleString()}</span>
                        </div>
                        <p className='mb-1'>{item.description}</p>
                        <div className='flex items-center gap-2'>
                            <UpdateItem item={item} onUpdate={updateItem} />
                            <Button size={'sm'} variant={'destructive'} onClick={() => deleteItem(item._id)}>Delete</Button>
                        </div>
                    </li>
                ))
            }
        </ScrollArea>
    )
}
