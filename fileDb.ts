import {promises as fs} from 'fs';
import {ICategory, ICategoryWithoutId} from "./types";

const fileName = './db.json';
let data: ICategory[] = [];

const fileDb = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = await JSON.parse(fileContent.toString()) as ICategory[];
        } catch (e) {
            console.error(e);
        }
    },
    async getCategories() {
        return data;
    },
    async addCategory(message: ICategoryWithoutId) {
        const id = crypto.randomUUID();
        const result = {id, ...message};
        data.push(result);
        await this.save();
        return result;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDb;