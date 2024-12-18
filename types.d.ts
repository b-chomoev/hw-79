export interface ICategory {
    id: string;
    name: string;
    description: string;
}

export interface ICategoryWithoutId {
    name: string;
    description: string;
}

export interface IPlace {
    id: string;
    name: string;
    description: string;
}

export interface IPlaceWithoutId {
    name: string;
    description: string;
}

export interface IItem {
    id: string;
    categoryId: string;
    placeId: string;
    name: string;
    description: string;
    image: string | null;
    datetime: string;
}

export interface IItemWithoutIdAndDatetime {
    categoryId: string;
    placeId: string;
    name: string;
    description: string;
    image: string | null;
}