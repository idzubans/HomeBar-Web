import type { MeasurementUnit } from "@prisma/client";

export interface Drink {
  id: string;
  name: string;
  imageUrl: string;
  tutorialUrl: string | null;
  ingredients:
    {
      name: string,
      id: string,
      amount: Number,
      unit: MeasurementUnit
    }[];
  categories: {
    id: string,
    name: string;
  }[];
}

export interface SearchDrinksParams {
  partyId?: string;
  skip?: number;
  take?: number;
  categories?: string[];
  ingredients?: string[];
  searchString?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  isAvailable: boolean;
  imageUrl: string;
}

export interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

export interface Party {
  id: string;
  name: string;
  endDate: Date;
}