'use client'

import List from "@/components/items";
import AddItem from "@/components/forms/add-item";
import { Item } from "@/components/items";
import { useEffect, useState } from "react";
import axios from "axios"

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/items')
        setItems(res.data)
      } catch (error) {
        console.error('error fetching data', error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`)
      setItems((prevItems) => prevItems.filter((item) => item._id !== id))
    } catch (error) {
      console.error('error deleting an item', error)
    }
  }

  const handleUpdate = (updatedItem: Item) => {
    setItems((prevItems) =>
        prevItems.map((item) =>
            item._id === updatedItem._id ? updatedItem : item
        )
    )
}

  return (
    <div>
      <h4 className='font-bold mb-2'>To-Do List using NextJs, ExpressJs, and MongoDb</h4>
      <div className="flex gap-3">
        <List items={items} deleteItem={handleDelete} updateItem={handleUpdate}/>
        <AddItem setItems={setItems}/>
      </div>
    </div>
  );
}
