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
      amount: number,
      unit: MeasurementUnit
    }[];
  categories: {
    id: string,
    name: string;
  }[];
}

export interface SearchDrinksParams {
  barId?: string;
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
  category: string | null;
}

export interface Category {
  id: string;
  name: string;
}

export interface Bar {
  id: string;
  name: string;
  bartenderId: string;
}

export interface Order {
  guestName: string;
  drinkId: string;
  barId: string;
}