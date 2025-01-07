'use client'

import React, { useEffect, useState } from "react";
import AddItem from "@/components/forms/add-item";
import Items from "@/components/items";
import { Item } from "@/components/items";
import axios from "axios";

export default function Home() {

  const [items, setItems] = useState<Item[]>([])

  // read
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

  // delete
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/items/${id}`)
      setItems((prevItems) => prevItems.filter((item) => item._id !== id))
    } catch (error) {
      console.error('error deleteing an item', error)
    }
  }

  // update
  const handleUpdate = (updatedItem: Item) => {
    setItems((prevItems) => prevItems.map((item) => item._id === updatedItem._id ? updatedItem : item))
  }

  return (
    <div className="flex items-center justify-center px-20 gap-5">
      <div>
        <h6 className="font-bold mb-4">To-Do List made in NextJs + ExpressJs + MongoDB</h6>
        <div className="p-10  bg-gray-50 dark:bg-black rounded-lg">
          <Items items={items} deleteItem={handleDelete} updateItem={handleUpdate}/>
        </div>
      </div>
      <AddItem setItems={setItems} />
    </div>
  );
}
