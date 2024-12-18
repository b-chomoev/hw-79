import express from 'express';
import categoriesRouter from "./routers/categories";
import fs = require('fs');
import fileDbCategories from './fileDbCategories';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);

const run = async () => {
    if (fs.existsSync('./dbCategories.json')) {
        await fileDbCategories.init();
    } else {
        fs.writeFileSync('./dbCategories.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));