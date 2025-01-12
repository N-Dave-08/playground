import express, { Request, Response } from "express"
import mongoose, { Document, mongo } from "mongoose"
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://localhost:27017/nextCrud')
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch((err) => {
        console.error('error connecting to mongodb', err)
    })

interface Item extends Document {
    title: String
    description: String
    createdAt: Date
}

const ItemSchema = new mongoose.Schema<Item>({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

const ItemModel = mongoose.model<Item>('Item', ItemSchema, 'todo')

// create
app.post('/items', async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body
        const newItem = new ItemModel({ title, description })
        await newItem.save()
        res.status(201).json(newItem)
    } catch (error) {
        console.error('error adding an item', error)
        res.status(500).json({ error: 'failed adding an item' })
    }
})

// read
app.get('/items', async (req: Request, res: Response) => {
    try {
        const items = await ItemModel.find()
        res.status(200).json(items)
    } catch (error) {
        console.error('error fetching item list', error)
        res.status(500).json({ error: 'failed fetching item list' })
    }
})

// update
app.put('/items/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title, description } = req.body
        const updateItem = await ItemModel.findByIdAndUpdate(id, { title, description }, { new: true })
        res.status(200).json(updateItem)
    } catch (error) {
        console.error('error updating item', error)
        res.status(500).json({ error: 'failed updating item' })
    }
})

// delete
app.delete('/items/:id', async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await ItemModel.findByIdAndDelete(id)
        res.status(204).send()
    } catch (error) {
        console.error('error deleting item', error)
        res.status(500).json({ error: 'failed deleting item' })
    }
})

app.listen(5000, () => {
    console.log('server is running in port 5000')
})