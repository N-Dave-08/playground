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
    title: string
    description: string
    createdAt: Date
}

const ItemSchema = new mongoose.Schema<Item>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
})

const ItemModel = mongoose.model<Item>('Item', ItemSchema, 'todo')

// create
app.post('/items', async( req: Request, res: Response) => {
    const {title, description} = req.body
    const newItem = new ItemModel({title, description})
    await newItem.save()
    res.status(201).json(newItem)
})

// read
app.get('/items', async (req: Request, res: Response) => {
    const items = await ItemModel.find()
    console.log(items)
    res.status(200).json(items)
})

// update
app.put('/items/:id', async (req: Request, res: Response) => {
    const {id} = req.params
    const { title, description} = req.body
    const updateItem = await ItemModel.findByIdAndUpdate(
        id, {title, description}, {new: true}
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