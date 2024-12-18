import {promises as fs} from 'fs';
import {IPlace, IPlaceWithoutId} from "./types";
import crypto from "crypto";

const fileName = './dbPlaces.json';
let dataPlace: IPlace[] = [];

const fileDbPlaces = {
    async init() {
        try {
            const fileContent = await fs.readFile(fileName);
            dataPlace = await JSON.parse(fileContent.toString()) as IPlace[];
        } catch (e) {
            console.error(e);
        }
    },
    async getPlaces() {
        return dataPlace.map(({id, name}) => ({id, name}));
    },
    async getPlaceById() {
        return dataPlace;
    },
    async addPlace(place: IPlaceWithoutId) {
        const id = crypto.randomUUID();
        const result = {id, ...place};
        dataPlace.push(result);
        await this.save();
        return result;
    },
    async save() {
        return fs.writeFile(fileName, JSON.stringify(dataPlace));
    }
};

export default fileDbPlaces;