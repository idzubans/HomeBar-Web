import { getCookie } from "cookies-next";
import type { GetServerSideProps, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import type { Category, Ingredient, Party } from "~/model";
import { useFilterCount } from "~/hooks/filter/useFilterCount";
import { getPartyById } from "~/server/domain/party";
import { getCategories } from "~/server/domain/drink";
import { getAvailableIngredients } from "~/server/domain/ingredient";
import { prisma } from "~/server/db";
import { SyncLoader } from "react-spinners";
import DrinkList from "~/components/DrinkList";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";
import { api } from "~/utils/api";
import JoinPartyForm from "~/components/JoinPartyForm";
import DrinksFilter from "~/components/DrinksFilter";
import MenuBar from "~/components/MenuBar";

interface Props {
  ingredients: Ingredient[];
  categories: Category[];
  party: Party;
  isGuest: boolean;
}

function Party({ ingredients, categories, party, isGuest }: Props) {
  const [filterDisplayed, setFilterDisplayed] = useState(false);
  const filterCount = useFilterCount();
  const router = useRouter();

  const { data: drinks, isLoading } = api.drinks.get.useQuery(router.query);

  console.log(isLoading);

  const onFilterClosed = () => {
    setFilterDisplayed(false);
  };

  const onPartyJoined = () => {
    router.replace(router.asPath);
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-t from-indigo-100">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  }

  if (!isGuest) {
    return <JoinPartyForm partyJoined={onPartyJoined} partyModel={party} />;
  } else if (drinks) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100 pb-8">
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
            <DrinkList drinks={drinks} />
          </>
        )}
      </div>
    );
  }
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  params,
}) => {
  const ssg = generateSSGHelper();

  if (typeof params?.partyId !== "string") {
    throw new Error("no id");
  }
  const party = await getPartyById(prisma, params?.partyId);

  const partyId = getCookie("partyId", { req, res });
  const guestId = getCookie("guestId", { req, res });
  const isGuest = guestId != null && partyId === params?.partyId;

  if (!party) {
    throw new Error("no party");
  }

  const drinks = ssg.drinks.get.prefetch({ partyId: party.id });
  const ingredients = getAvailableIngredients(prisma, party.userId);
  const categories = getCategories();

  const result = await Promise.all([drinks, ingredients, categories]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ingredients: result[1],
      categories: result[2],
      party: JSON.parse(JSON.stringify(party)),
      isGuest,
    },
  };
};

export default Party;
