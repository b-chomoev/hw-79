import express from "express";
import {ICategoryWithoutId} from "../types";
import fileDb from "../fileDb";

const categoriesRouter = express.Router();

categoriesRouter.post('/', async (req, res) => {
    const category: ICategoryWithoutId = {
        categoryName: req.body.categoryName,
        description: req.body.description,
    };

    if (!req.body.categoryName) {
        res.status(400).send({error: 'Category name must be present in the request'});
    }

    const savedCategory = await fileDb.addCategory(category);

    res.send(savedCategory);
});

categoriesRouter.get('/', async (req, res) => {
    const categories = await fileDb.getCategories();
    res.send(categories);
});

export default categoriesRouter;