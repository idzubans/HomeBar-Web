import type { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { Category, Ingredient, Party, SearchDrinksParams } from "~/model";
import { useFilterCount } from "~/hooks/filter/useFilterCount";
import { getAllActivePartiesId, getPartyById } from "~/server/domain/party";
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
import { motion } from "framer-motion";

interface Props {
  ingredients: Ingredient[];
  categories: Category[];
  party: Party;
}

const prepareFilterObject = (param: string | string[]): string[] => {
  if (Array.isArray(param)) {
    return param;
  }
  return [param];
};

function Party({ ingredients, categories, party }: Props) {
  const [filterDisplayed, setFilterDisplayed] = useState(false);
  const [filter, setFilter] = useState<SearchDrinksParams>({});
  const filterCount = useFilterCount();
  const router = useRouter();

  const { data: drinks, isLoading } = api.drinks.get.useQuery(filter);

  useEffect(() => {
    if (router.query) {
      setFilter({
        ...router.query,
        ...(router.query.categories && {
          categories: prepareFilterObject(router.query.categories),
        }),
        ...(router.query.ingredients && {
          ingredients: prepareFilterObject(router.query.ingredients),
        }),
      });
    }
  }, [router.query]);

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

if (drinks) {
    return (
      <motion.div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100 pb-8">
        {filterDisplayed ? (
          <DrinksFilter
            filterClose={onFilterClosed}
            ingredients={ingredients}
            categories={categories}
          ></DrinksFilter>
        ) : (
          <motion.div>
            <MenuBar
              filterCount={filterCount}
              onFilterClicked={() => setFilterDisplayed(true)}
            />
            <DrinkList drinks={drinks} />
          </motion.div>
        )}
      </motion.div>
    );
  }
}

export const getServer: GetStaticProps = async ({ params }) => {
  const ssg = generateSSGHelper();

  if (typeof params?.partyId !== "string") {
    throw new Error("no id");
  }
  const party = await getPartyById(prisma, params?.partyId);

  // const partyId = getCookie("partyId", { req, res });
  // const guestId = getCookie("guestId", { req, res });
  // const isGuest = guestId != null && partyId === params?.partyId;

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
    },
  };
};

// export const getServerSideProps = async () => {
//   const parties = await getAllActivePartiesId(prisma);
//   const paths = parties.map((partyId: string) => ({
//     params: { partyId },
//   }));
//   return { paths, fallback: "blocking" };
// };

export default Party;
