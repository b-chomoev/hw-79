export interface ICategory {
    id: string;
    categoryName: string;
    description: string;
}

export interface ICategoryWithoutId {
    categoryName: string;
    description: string;
}