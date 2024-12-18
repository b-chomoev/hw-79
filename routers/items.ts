import express from "express";
import {imagesUpload} from "../multer";
import {IItemWithoutIdAndDatetime} from "../types";
import fileDbItem from "../fileDbItem";

const itemsRouter = express.Router();

itemsRouter.post('/', imagesUpload.single('image'),async (req, res) => {
    if (!req.body.categoryId || !req.body.placeId || !req.body.name) {
        res.status(400).send({error: 'CategoryId, placeId and name must be present in the request'});
        return;
    }

    const item: IItemWithoutIdAndDatetime = {
        categoryId: req.body.categoryId,
        placeId: req.body.placeId,
        name: req.body.name,
        description: req.body.description,
        image: req.file ? 'images' + req.file.filename : null,
    }

    const savedItem = await fileDbItem.addItem(item);

    res.send(savedItem);
});

itemsRouter.get('/', async (_req, res) => {
    const items = await fileDbItem.getItems();
    res.send(items);
});

itemsRouter.get('/:id', async (req, res) => {
    const items = await fileDbItem.getItemsById();
    const itemFindById = items.find((item) => item.id === req.params.id);
    res.send(itemFindById);
});

itemsRouter.delete('/:id', async (req, res) => {
    const items = await fileDbItem.getItemsById();
    const itemIndex = items.findIndex((item) => item.id === req.params.id);
    if (itemIndex === -1) {
        res.status(404).send({error: 'Item not found'});
        return;
    } else {
        items.splice(itemIndex, 1);
        await fileDbItem.save();
        res.send('Item deleted');
    }
});

export default itemsRouter;