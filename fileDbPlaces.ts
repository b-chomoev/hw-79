import {IPlace, IPlaceWithoutId} from "./types";
import crypto from "crypto";
import {promises as fs} from 'fs';

const fileName = './dbPlaces.json';
let data: IPlace[] = [];

const fileDbPlaces = {
    async init() {

    },
    async getPlaces() {
        return data;
    },
    async addPlace(place: IPlaceWithoutId) {
        const id = crypto.randomUUID();
        const result = {id, ...place};
        data.push(result);
        await this.save();
        return result;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(data));
    }
};

export default fileDbPlaces;