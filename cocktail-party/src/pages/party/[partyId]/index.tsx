import { getCookie } from "cookies-next";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import DrinkCart from "~/components/DrinkCard";
import DrinksFilter from "~/components/DrinksFilter";
import JoinPartyForm from "~/components/JoinPartyForm";
import { ReturnModel } from "~/components/JoinPartyForm/JoinPartyForm";
import MenuBar from "~/components/MenuBar";
import type {
  Category,
  Drink,
  Ingredient,
  SearchDrinksParams,
  Party,
} from "~/model";
import { getCategories } from "~/server/drinks/getCategories";
import { getDrinks } from "~/server/drinks/getDrinks";
import { getIngredients } from "~/server/ingredients/getIngredients";
import { getPartyById } from "~/server/party";
import { ParsedUrlQuery, stringify } from "querystring";
import queryString from "query-string";
import { useFilterCount } from "~/hooks/filter/useFilterCount";
import useSWR from "swr";

interface Props {
  drinks: Drink[];
  ingredients: Ingredient[];
  categories: Category[];
  party: Party;
}

const fetcher = async (queryParams: ParsedUrlQuery) => {
  const parsedParams = queryString.stringify(queryParams)
  const response = await fetch(`/api/drinks?${parsedParams}`);
  const drinks = await response.json();
  return drinks as Drink[];
}

function Party({ drinks, ingredients, categories, party }: Props) {
  const [filterDisplayed, setFilterDisplayed] = useState(false);
  const filterCount = useFilterCount();
  const router = useRouter();

  // const [queryParams, setQueryParams] = useState("");
  const { data } = useSWR(router.query, fetcher);

  const onFilterClosed = () => {
    setFilterDisplayed(false);
  };

  const onPartyJoined = () => {
    router.replace(router.asPath);
  };

  // useEffect(() => {
  //   const params: SearchDrinksParams = { ...router.query };
    

  // }, [router.query]);

  return (
    <>
      {data ? (
        <div className="h-screen w-screen bg-gradient-to-t from-indigo-100">
          {filterDisplayed ? (
            <DrinksFilter
              filterClose={onFilterClosed}
              ingredients={ingredients}
              categories={categories}
            ></DrinksFilter>
          ) : (
            <>
              <MenuBar
                filterCount={filterCount}
                onFilterClicked={() => setFilterDisplayed(true)}
              />
              <DrinkCart drinks={data} />
            </>
          )}
        </div>
      ) : (
        <JoinPartyForm partyJoined={onPartyJoined} partyModel={party} />
      )}
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const partyIdCookie = getCookie("partyId", { req, res });
  const queryId = query.partyId as string;
  const party = await getPartyById(queryId);

  if (party) {
    if (partyIdCookie && query.partyId === partyIdCookie.toString()) {
      const drinks = getDrinks({ partyId: party.id });
      const ingredients = getIngredients();
      const categories = getCategories();

      const result = await Promise.all([drinks, ingredients, categories]);
      return {
        props: {
          drinks: result[0],
          ingredients: result[1],
          categories: result[2],
          party: JSON.parse(JSON.stringify(party)),
          fallback: {
            "/api/drinks": result[0],
          },
        },
      };
    }
    return {
      props: {
        party: JSON.parse(JSON.stringify(party)),
      },
    };
  }
  return {
    props: {},
  };
};

export default Party;
