import express from 'express';
import categoriesRouter from "./routers/categories";
import fs = require('fs');
import fileDbCategories from './fileDbCategories';
import placesRouter from "./routers/places";
import fileDbPlaces from "./fileDbPlaces";

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);
app.use('/places', placesRouter);

const run = async () => {
    if (fs.existsSync('./dbCategories.json')) {
        await fileDbCategories.init();
    } else if (fs.existsSync('./dbPlaces.json')) {
        await fileDbPlaces.init();
    } else {
        fs.writeFileSync('./dbCategories.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));