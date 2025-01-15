'use client'

import Items from "@/components/items";
import { Item } from "@/components/items";
import { useEffect, useState } from "react";
import axios from "axios";
import AddItem from "@/components/forms/add-item";

export default function Home() {
  const [items, setItems] = useState<Item[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:5000/items')
        setItems(res.data)
      } catch (error) {
        console.log('error fetching item list', error)
      }
    }
    fetchData()
  }, [items])

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`)
    } catch (error) {
      console.log('error deleting an item', error)
    }
  }

  return (
    <div className="flex gap-3 items-center justify-center h-screen w-full">
      <Items deleteItem={handleDelete} items={items}/>
      <AddItem/>
    </div>
  );
}
