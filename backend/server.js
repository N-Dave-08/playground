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
    console.log('error connecting to mongodb', err);
});
const ItemSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
const ItemModel = mongoose_1.default.model('Item', ItemSchema, 'todo');
// create
app.post('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description } = req.body;
    const newItem = new ItemModel({ title, description });
    yield newItem.save();
    res.status(201).json(newItem);
}));
// read
app.get('/items', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield ItemModel.find();
    console.log(items);
    res.status(200).json(items);
}));
// update
app.put('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { title, description } = req.body;
    const updateItem = yield ItemModel.findByIdAndUpdate(id, { title, description }, { new: true });
    res.status(200).json(updateItem);
}));
// delete
app.delete('/items/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield ItemModel.findByIdAndDelete(id);
    res.status(204).send();
}));
app.listen(5000, () => {
    console.log("server is running in port 5000");
});
