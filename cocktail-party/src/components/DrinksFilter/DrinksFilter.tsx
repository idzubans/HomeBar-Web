import { useRouter } from "next/router";
import queryString from "query-string";
import {
  IFilterElement,
  useFilterElement,
} from "~/hooks/filter/useFilterElement";
import { Category, Ingredient, SearchDrinksParams } from "~/model";
import { Button } from "../shared/Button";
import FilterCard from "./FilterCard";
import { getCookie } from "cookies-next";
import { motion } from "framer-motion";

interface Props {
  ingredients: Ingredient[];
  categories: Category[];
  filterClose: () => void;
}

function DrinksFilter({ ingredients, categories, filterClose }: Props) {
  //const [searchString, setSearchString] = useState<string>();
  const router = useRouter();

  const categoryFilter: IFilterElement = useFilterElement("categories");
  const ingredientFilter: IFilterElement = useFilterElement("ingredients");

  const saveFilter = () => {
    const searchParams: SearchDrinksParams = {
      ...(categoryFilter.selectedItems.length > 0 && {
        categories: categoryFilter.selectedItems,
      }),
      ...(ingredientFilter.selectedItems.length > 0 && {
        ingredients: ingredientFilter.selectedItems,
      }),
      //searchString: searchString,
    };
    const filter = queryString.stringify(searchParams);
    const route = filter
      ? `${router.query.barId}?${filter}`
      : `${router.query.barId}`;

    void router.push(route, undefined, { shallow: true });
    // router.push({ pathname: router.pathname, query: {id: router.query.id, filter} }, undefined, { shallow: true });

    filterClose();
  };

  const resetFilter = () => {
    categoryFilter.resetFilter();
    ingredientFilter.resetFilter();

    void router.push(
      {
        pathname: router.pathname,
        query: { barId: router.query.barId },
      },
      undefined,
      { shallow: true }
    );
    filterClose();
  };

  return (
    <motion.div
      transition={{
        duration: 0.7,
        type: "spring",
        damping: 15,
        stiffness: 150,
      }}
      initial={{ opacity: 0, y: 800 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 800 }}
      className="m-auto flex flex-col items-center justify-center gap-8 p-4"
    >
      <div>
        <h2 className="flex items-center justify-center py-2 font-semibold text-purple-800">
          Categories
        </h2>
        <motion.div className="flex flex-wrap gap-2">
          {categories.map((category: Category, index: number) => (
            <FilterCard
              name={category.name}
              isSelected={categoryFilter.selectedItems.includes(category.name)}
              key={category.name}
              onToggle={() => categoryFilter.toggleItem(category.name)}
              index={index}
            />
          ))}
        </motion.div>

        <hr className="mt-8 border-t-purple-800" />

        <h2 className="flex items-center justify-center py-2 font-semibold text-purple-800">
          Ingredients
        </h2>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient: Ingredient, index: number) => (
            <FilterCard
              name={ingredient.name}
              isSelected={ingredientFilter.selectedItems.includes(
                ingredient.name
              )}
              key={ingredient.name}
              onToggle={() => ingredientFilter.toggleItem(ingredient.name)}
              index={index}
            />
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 flex min-w-full justify-center gap-8 rounded-2xl px-0 pb-4 pt-2 backdrop-blur-sm">
        <Button isPrimary onClick={saveFilter}>
          Apply
        </Button>
        <Button isPrimary={false} onClick={resetFilter}>
          Reset
        </Button>
      </div>
    </motion.div>
  );
}

export default DrinksFilter;
