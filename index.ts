import express from 'express';
import categoriesRouter from "./routers/categories";
import fs = require('fs');
import fileDb from './fileDb';

const app = express();
const port = 8000;

app.use(express.json());
app.use('/categories', categoriesRouter);

const run = async () => {
    if (fs.existsSync('./db.json')) {
        await fileDb.init();
    } else {
        fs.writeFileSync('./db.json', JSON.stringify([]));
    }

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });
};

run().catch(err => console.log(err));