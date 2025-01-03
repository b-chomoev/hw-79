import {promises as fs} from 'fs';
import {ICategory, ICategoryWithoutId} from "./types";
import crypto from "crypto";

const fileName = './dbCategories.json';
let data: ICategory[] = [];

const fileDbCategories = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = await JSON.parse(fileContent.toString()) as ICategory[];
        } catch (e) {
            console.error(e);
        }
    },
    async getCategories() {
        return data.map(({id, name}) => ({id, name}));
    },
    async getCategoryById() {
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

export default fileDbCategories;