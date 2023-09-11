import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import type { Category, Ingredient, Bar, SearchDrinksParams } from "~/model";
import { useFilterCount } from "~/hooks/filter/useFilterCount";
import { SyncLoader } from "react-spinners";
import DrinkList from "~/components/DrinkList";
import { api } from "~/utils/api";
import DrinksFilter from "~/components/DrinksFilter";
import MenuBar from "~/components/MenuBar";
import { GetStaticProps } from "next";
import { prisma } from "~/server/db";
import { getAllBarIds, getBarById } from "~/server/domain/bar";
import { getCategories } from "~/server/domain/drink";
import { getAvailableIngredients } from "~/server/domain/ingredient";
import { generateSSGHelper } from "~/server/helpers/ssgHelper";

interface Props {
  ingredients: Ingredient[];
  categories: Category[];
  bar: Bar;
  isGuest: boolean;
}

const prepareFilterObject = (param: string | string[]): string[] => {
  if (Array.isArray(param)) {
    return param;
  }
  return [param];
};

function Bar({ ingredients, categories, bar }: Props) {
  const [filterDisplayed, setFilterDisplayed] = useState(false);
  const [filter, setFilter] = useState<SearchDrinksParams>({barId: bar.id});
  const filterCount = useFilterCount();
  const router = useRouter();

  const { data: drinks, isLoading } = api.drinks.get.useQuery(filter, { refetchOnMount: false, refetchOnWindowFocus: false });

  useMemo(() => {
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

  if (isLoading || !drinks) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-t from-indigo-100">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  }
  else{
    return (
      <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100 pb-8">
        {filterDisplayed ? (
          <DrinksFilter
            filterClose={onFilterClosed}
            ingredients={ingredients}
            categories={categories}
          ></DrinksFilter>
        ) : (
          <div>
            <MenuBar
              filterCount={filterCount}
              onFilterClicked={() => setFilterDisplayed(true)}
            />
            <DrinkList drinks={drinks} />
          </div>
        )}
      </div>
    );
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const ssg = generateSSGHelper();

  if (typeof params?.barId !== "string") {
    throw new Error("no id");
  }
  const bar = await getBarById(prisma, params?.barId);

  if (!bar) {
    throw new Error("no bar");
  }

  const drinks = ssg.drinks.get.prefetch({ barId: bar.id });
  const ingredients = getAvailableIngredients(prisma, bar.id);
  const categories = getCategories();

  const result = await Promise.all([drinks, ingredients, categories]);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      ingredients: result[1],
      categories: result[2],
      bar: JSON.parse(JSON.stringify(bar)),
    },
    revalidate: 1,
  };
};

export const getStaticPaths = async () => {
  const bars = await getAllBarIds(prisma);
  const paths = bars.map((barId: string) => ({
    params: { barId },
  }));
  return { paths, fallback: "blocking" };
};

export default Bar;
