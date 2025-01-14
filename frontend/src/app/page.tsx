'use client'

import Items, { Item } from "@/components/items";
import axios from "axios";
import { useEffect, useState } from "react";
import AddItem from "@/components/forms/add-item";

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/items')
        setItems(res.data)
      } catch (error) {
        console.error('error fetching item list', error)
      }
    }
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`)
      setItems((prevItems) => prevItems.filter((item) => item._id !== id))
    } catch (error) {
      console.error('error deleting item')
    }
  }

  const handleUpdate = async (updatedItem: Item) => {
    setItems((prevItems) => prevItems.map((item) => item._id === updatedItem._id ? updatedItem : item))
  }

  return (
    <div className="flex gap-3">
      <Items items={items} deleteItem={handleDelete} updateItem={handleUpdate}/>
      <AddItem setItems={setItems} />
    </div>
  );
}
