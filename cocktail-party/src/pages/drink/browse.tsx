import type { GetServerSideProps } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import DrinkCart from "~/components/DrinkCard";
import DrinksFilter from "~/components/DrinksFilter";
import MenuBar from "~/components/MenuBar";
import type { Category, Drink, Ingredient, SearchDrinksParams } from "~/model";
import { getCategories } from "~/server/drinks/getCategories";
import { getDrinks } from "~/server/drinks/getDrinks";
import { getIngredients } from "~/server/ingredients/getIngredients";

interface Props {
  drinks: Drink[];
  ingredients: Ingredient[];
  categories: Category[];
}

function BrowseDrinks({ drinks, ingredients, categories }: Props) {
  const { data: session } = useSession()

  const [drinkList, setDrinkList] = useState<Drink[]>(drinks);
  const [filterDisplayed, setFilterDisplayed] = useState(false);
  const router = useRouter();

  const refetchData = (params: SearchDrinksParams) => {
    setFilterDisplayed(false);
  };

  return (
    <div className="h-screen w-screen bg-gradient-to-t from-indigo-100">
              <div >
          {session && session.user ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
      {filterDisplayed ? (
        <DrinksFilter
          onFilterUpdated={refetchData}
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
  const ingredients = getIngredients();
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
