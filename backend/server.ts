import express, { Request, Response } from 'express'
import mongoose, { Document } from 'mongoose'
import cors from 'cors'

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/nextCrud')
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((err) => {
        console.log('error connecting to mongodb', err)
    })

interface Item extends Document {
    name: string
    description: string
}

const ItemSchema = new mongoose.Schema<Item>({
    name: String,
    description: String,
})

const ItemModel = mongoose.model<Item>('Item', ItemSchema, 'todo')

// create
app.post('/items', async (req: Request, res: Response) => {
    const { name, description } = req.body
    const newItem = new ItemModel({ name, description })
    await newItem.save()
    res.status(201).json(newItem)
})

// read
app.get('/items', async (req: Request, res: Response) => {
    const items = await ItemModel.find()
    res.status(200).json(items)
})

// update
app.put('/items/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    const { name, description } = req.body
    const updateItem = await ItemModel.findByIdAndUpdate(
        id, { name, description }, { new: true }
    )
    res.status(200).json(updateItem)
})

// delete
app.delete('/items/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    await ItemModel.findByIdAndDelete(id)
    res.status(204).send()
})

app.listen(5000, () => {
    console.log("server is running in port 5000")
})