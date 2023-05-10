import { getCookie } from "cookies-next";
import type { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import DrinkCart from "~/components/DrinkCard";
import DrinksFilter from "~/components/DrinksFilter";
import JoinPartyForm from "~/components/JoinPartyForm";
import MenuBar from "~/components/MenuBar";
import type { Category, Drink, Ingredient, Party } from "~/model";
import { ParsedUrlQuery } from "querystring";
import queryString from "query-string";
import { useFilterCount } from "~/hooks/filter/useFilterCount";
import useSWR from "swr";
import { getPartyById } from "~/server/domain/party";
import { getCategories, getDrinks } from "~/server/domain/drink";
import { getIngredients } from "~/server/domain/ingredient";
import { prisma } from "~/server/db";
import { SyncLoader } from "react-spinners";

interface Props {
  drinks: Drink[];
  ingredients: Ingredient[];
  categories: Category[];
  party: Party;
}

const fetcher = async (queryParams: ParsedUrlQuery) => {
  const parsedParams = queryString.stringify(queryParams);
  const response = await fetch(`/api/drinks?${parsedParams}`);
  const drinks = await response.json();
  return drinks as Drink[];
};

function Party({ drinks, ingredients, categories, party }: Props) {
  const [filterDisplayed, setFilterDisplayed] = useState(false);
  const filterCount = useFilterCount();
  const router = useRouter();

  const partyId = getCookie("partyId");
  const guestId = getCookie("guestId");

  const isGuest = guestId && partyId === router.query.partyId;

  const { data, isLoading } = useSWR(router.query, fetcher);

  const onFilterClosed = () => {
    setFilterDisplayed(false);
  };

  const onPartyJoined = () => {
    router.replace(router.asPath);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100 flex items-center justify-center">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (!isGuest) {
    return <JoinPartyForm partyJoined={onPartyJoined} partyModel={party} />;
  } else if (data) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100">
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
    );
  }

  // return (
  //   <>
  //     {isGuest && data ? (
  //       <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100">
  //         {filterDisplayed ? (
  //           <DrinksFilter
  //             filterClose={onFilterClosed}
  //             ingredients={ingredients}
  //             categories={categories}
  //           ></DrinksFilter>
  //         ) : (
  //           <>
  //             <MenuBar
  //               filterCount={filterCount}
  //               onFilterClicked={() => setFilterDisplayed(true)}
  //             />
  //             <DrinkCart drinks={data} />
  //           </>
  //         )}
  //       </div>
  //     ) : (
  //       <JoinPartyForm partyJoined={onPartyJoined} partyModel={party} />
  //     )}
  //   </>
  // );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const partyIdCookie = getCookie("partyId", { req, res });
  const queryId = query.partyId as string;
  const party = await getPartyById(prisma, queryId);

  if (party) {
    if (partyIdCookie && query.partyId === partyIdCookie.toString()) {
      const drinks = getDrinks({ partyId: party.id });
      const ingredients = getIngredients(prisma);
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
