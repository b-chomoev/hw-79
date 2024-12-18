import {IItem, IItemWithoutIdAndDatetime} from "./types";
import {promises as fs} from 'fs';

const fileName = './dbItems.json';
let data: IItem[] = [];

const fileDbItem = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            data = JSON.parse(fileContent.toString()) as IItem[];
        } catch (err) {
            console.log(err);
        }
    },
    async getItems() {
        return data.map(({id, categoryId, placeId, name}) => ({id, categoryId, placeId, name,}));
    },
    async getItemsById() {
      return data;
    },
    async addItem(item: IItemWithoutIdAndDatetime) {
        const id = crypto.randomUUID();
        const datetime = new Date().toISOString();
        const itemResult = {id, ...item, datetime}
        data.push(itemResult);
        await this.save();
        return itemResult;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
}

export default fileDbItem;