import express from 'express';
import categoriesRouter from "./routers/categories";
import fileDbCategories from './fileDbCategories';
import placesRouter from "./routers/places";
import fileDbPlaces from "./fileDbPlaces";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);

const run = async () => {
    await fileDbCategories.init();
    await fileDbPlaces.init();

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));