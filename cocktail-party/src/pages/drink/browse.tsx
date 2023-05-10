import type { GetServerSideProps } from "next";
import { useState } from "react";
import DrinkCart from "~/components/DrinkCard";
import DrinksFilter from "~/components/DrinksFilter";
import MenuBar from "~/components/MenuBar";
import type { Category, Drink, Ingredient } from "~/model";
import { prisma } from "~/server/db";
import { getCategories, getDrinks } from "~/server/domain/drink";
import { getIngredients } from "~/server/domain/ingredient";

interface Props {
  drinks: Drink[];
  ingredients: Ingredient[];
  categories: Category[];
}

function BrowseDrinks({ drinks, ingredients, categories }: Props) {
  const [drinkList, setDrinkList] = useState<Drink[]>(drinks);
  const [filterDisplayed, setFilterDisplayed] = useState(false);

  const onFilterClose = () => {
    setFilterDisplayed(false);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100">
      {filterDisplayed ? (
        <DrinksFilter
          filterClose={onFilterClose}
          ingredients={ingredients}
          categories={categories}
        ></DrinksFilter>
      ) : (
        <>
          <MenuBar
            filterCount={1}
            onFilterClicked={() => setFilterDisplayed(true)}
          />
          <DrinkCart drinks={drinkList} />
        </>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const drinks = getDrinks({});
  const ingredients = getIngredients(prisma);
  const categories = getCategories();

  const result = await Promise.all([drinks, ingredients, categories]);
  return {
    props: {
      drinks: result[0],
      ingredients: result[1],
      categories: result[2],
    },
  };
};

export default BrowseDrinks;
