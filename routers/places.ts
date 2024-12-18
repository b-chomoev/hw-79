import express from "express";
import {IPlaceWithoutId} from "../types";
import fileDbPlaces from "../fileDbPlaces";

const placesRouter = express.Router();

placesRouter.post('/', async (req, res) => {
    const place: IPlaceWithoutId = {
        name: req.body.name,
        description: req.body.description,
    };

    if (!req.body.name) {
        res.status(400).send({error: 'Place name must be present in the request'});
    }

    const savedPlace = await fileDbPlaces.addPlace(place);

    res.send(savedPlace);
});

export default placesRouter;