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

placesRouter.get('/', async (_req, res) => {
    const places = await fileDbPlaces.getPlaces();
    res.send(places);
});

placesRouter.get('/:id', async (req, res) => {
    const places = await fileDbPlaces.getPlaceById();
    const place = places.find(place => place.id === req.params.id);
    if (place) {
        res.send(place);
    } else {
        res.status(404).send({error: 'Place not found'});
    }
});

placesRouter.delete('/:id', async (req, res) => {
    const places = await fileDbPlaces.getPlaceById();
    const placeIndex = places.findIndex(place => place.id === req.params.id);
    if (placeIndex === -1) {
        res.status(404).send({error: 'Place not found'});
    } else {
        places.splice(placeIndex, 1);
        await fileDbPlaces.save();
        res.send('Place deleted');
    }
});

export default placesRouter;