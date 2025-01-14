'use client'

import Items from "@/components/items";
import { useEffect, useState } from "react";
import axios from "axios"
import AddItem from "@/components/forms/add-item";

export type Item = {
  _id: string
  title: string
  description: string
  createdAt: Date
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    try {
      const fetchData = async () => {
        const res = await axios.get('http://localhost:5000/items')
        setItems(res.data)
      }
      fetchData()
    } catch (error) {
      console.error('error fetching item list', error)
    }
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`)
      setItems((prevItems) => prevItems.filter((item) => item._id !== id))
    } catch (error) {
      console.error('error deleting an item', error)
    }
  }

  const handleUpdate = async (updatedItem: Item) => {
    setItems((prevItems) => prevItems.map((item) => item._id === updatedItem._id ? updatedItem : item))
  }

  return (
    <div className="flex gap-3">
      <Items items={items} deleteItem={handleDelete} updateItem={handleUpdate}/>
      <AddItem setItems={setItems}/>
    </div>
  );
}
