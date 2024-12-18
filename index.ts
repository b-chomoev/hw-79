import express from 'express';
import categoriesRouter from "./routers/categories";
import fileDbCategories from './fileDbCategories';
import placesRouter from "./routers/places";
import fileDbPlaces from "./fileDbPlaces";
import itemsRouter from "./routers/items";
import fileDbItem from "./fileDbItem";

const app = express();
const port = 8000;

app.use(express.json());
app.use(express.static('public'));
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouter);

const run = async () => {
    await fileDbCategories.init();
    await fileDbPlaces.init();
    await fileDbItem.init();

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));