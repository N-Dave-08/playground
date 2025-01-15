"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/nextCrud')
    .then(() => {
    console.log('connected to mongodb');
})
    .catch((err) => {
    console.error('error connecting to mongodb', err);
});
const ItemSchema = new mongoose_1.default.Schema({
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
        default: Date.now,
    },
});
const ItemModel = mongoose_1.default.model('Item', ItemSchema, 'todo');
// create
app.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description } = req.body;
        const addItem = new ItemModel({ title, description });
        yield addItem.save();
        res.status(200).json(addItem);
    }
    catch (error) {
        console.error('error creating an item', error);
        res.status(500).json({ error: 'failed creating an item' });
    }
}));
// read
app.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield ItemModel.find();
        res.status(200).json(items);
    }
    catch (error) {
        console.error('error rendering item list', error);
        res.status(500).json({ error: 'failed fetching item list' });
    }
}));
// update
app.put('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { title, description } = req.body;
        const updateItem = yield ItemModel.findByIdAndUpdate(id, { title, description }, { new: true });
        res.status(200).json(updateItem);
    }
    catch (error) {
        console.error('error updating an item', error);
        res.status(500).json({ error: 'failed updating an item' });
    }
}));
// delete
app.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield ItemModel.findByIdAndDelete(id);
        res.status(204).send();
    }
    catch (error) {
        console.error('error deleting an item', error);
        res.status(500).json({ error: 'failed deleting an item' });
    }
}));
app.listen(5000, () => {
    console.log('server running in port 5000');
});
