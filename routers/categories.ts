import express from "express";
import {ICategoryWithoutId} from "../types";
import fileDbCategories from "../fileDbCategories";

const categoriesRouter = express.Router();

categoriesRouter.post('/', async (req, res) => {
    const category: ICategoryWithoutId = {
        name: req.body.name,
        description: req.body.description,
    };

    if (!req.body.name) {
        res.status(400).send({error: 'Category name must be present in the request'});
    }

    const savedCategory = await fileDbCategories.addCategory(category);

    res.send(savedCategory);
});

categoriesRouter.get('/', async (_req, res) => {
    const categories = await fileDbCategories.getCategories();
    res.send(categories);
});

categoriesRouter.get('/:id', async (req, res) => {
    const categories = await fileDbCategories.getCategoryById();
    const category = categories.find(category => category.id === req.params.id);
    if (category) {
        res.send(category);
    } else {
        res.status(404).send({error: 'Category not found'});
    }
});

categoriesRouter.delete('/:id', async (req, res) => {
    const categories = await fileDbCategories.getCategoryById();
    const categoryIndex = categories.findIndex(category => category.id === req.params.id);
    if (categoryIndex === -1) {
        res.status(404).send({error: 'Category not found'});
    } else {
        categories.splice(categoryIndex, 1);
        await fileDbCategories.save();
        res.send('Category deleted');
    }
});

categoriesRouter.put('/:id', async (req, res) => {
    const categories = await fileDbCategories.getCategoryById();
    const categoryIndex = categories.findIndex(category => category.id === req.params.id);
    if (categoryIndex === -1) {
        res.status(404).send({error: 'Category not found'});
    } else {
        const category: ICategoryWithoutId = {
            name: req.body.name,
            description: req.body.description,
        };
        categories[categoryIndex] = {...categories[categoryIndex], ...category};
        await fileDbCategories.save();
        res.send(categories[categoryIndex]);
    }
});

export default categoriesRouter;