'use client'

import { useEffect, useState } from "react";
import axios from "axios";
import { AddItem } from "@/components/add-item";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UpdateItem } from "@/components/update-item";
import { Item } from "@/components/add-item";

export default function Home() {
  const [items, setItems] = useState<Item[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/items')
        setItems(res.data)
      } catch (error) {
        console.error('error fetching data', error)
        setError('failed to load data')
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleRemove = async (id: string) => {
    await axios.delete(`http://localhost:5000/items/${id}`)
    setItems(items.filter(item => item._id !== id))
  }

  const handleUpdate = (updatedItem: { name: string; description: string }, id: string) => {
    // Update the item in the state without needing to refresh
    setItems(items.map(item =>
      item._id === id ? { ...item, ...updatedItem } : item
    ));
  };

  return (
    <div className="flex gap-4 items-center justify-center h-screen">
      <Card className="w-1/2">
        <CardHeader>
          <CardTitle>To Do List</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {
              !loading ? (
                items.length === 0 ? <div>no items found</div> :
                  items.map((item) => (
                    <li key={item._id} className="list-disc">
                      <div className="flex justify-between">
                        <div>
                          <h4 className="capitalize">{item.name}</h4>
                          <p>{item.description}</p>
                        </div>
                        <div className="space-x-2">
                          <UpdateItem
                            id={item._id}
                            currentName={item.name}
                            currentDescription={item.description}
                            onSave={(updatedItem) => handleUpdate(updatedItem, item._id)} 
                          />
                          <Button variant={'destructive'} onClick={() => handleRemove(item._id)}>Delete</Button>
                        </div>
                      </div>
                    </li>
                  ))
              ) : (
                <div>loading..</div>
              )
            }
          </ul>
        </CardContent>
      </Card>
      <AddItem setItems={setItems} />
    </div>
  );
}
