import { useRouter } from "next/router";
import queryString from "query-string";
import {
  IFilterElement,
  useFilterElement,
} from "~/hooks/filter/useFilterElement";
import { Category, Ingredient, SearchDrinksParams } from "~/model";
import { Button } from "../shared/Button";
import FilterCard from "./FilterCard";

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
      ? `${router.query.partyId}?${filter}`
      : `${router.query.partyId}`;

    router.push(route, undefined, { shallow: true });
    // router.push({ pathname: router.pathname, query: {id: router.query.id, filter} }, undefined, { shallow: true });

    filterClose();
  };

  const resetFilter = () => {
    categoryFilter.resetFilter();
    ingredientFilter.resetFilter();

    router.push(
      {
        pathname: router.pathname,
        query: { partyId: router.query.partyId },
      },
      undefined,
      { shallow: true }
    );
    filterClose();
  };

  return (
    <div className="m-auto flex flex-col items-center justify-center gap-8 p-4">
      <div>
        <h2 className="flex items-center justify-center py-2 font-semibold text-purple-800">
          Categories
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category: Category) => (
            <FilterCard
              name={category.name}
              imageUrl={category.imageUrl}
              isSelected={categoryFilter.selectedItems.includes(category.name)}
              key={category.name}
              onToggle={() => categoryFilter.toggleItem(category.name)}
            />
          ))}
        </div>

        <hr className="mt-8 border-t-purple-800" />

        <h2 className="flex items-center justify-center py-2 font-semibold text-purple-800">
          Ingredients
        </h2>
        <div className="flex flex-wrap gap-2">
          {ingredients.map((ingredient: Ingredient) => (
            <FilterCard
              name={ingredient.name}
              imageUrl={ingredient.imageUrl}
              isSelected={ingredientFilter.selectedItems.includes(
                ingredient.name
              )}
              key={ingredient.name}
              onToggle={() => ingredientFilter.toggleItem(ingredient.name)}
            />
          ))}
        </div>
      </div>
      <div className="sticky bottom-0 flex justify-center gap-8 rounded-2xl px-0 pt-2 pb-4 backdrop-blur-sm">
        <Button isPrimary onClick={saveFilter}>
          Apply
        </Button>
        <Button isPrimary={false} onClick={resetFilter}>
          Reset
        </Button>
      </div>
    </div>
  );
}

export default DrinksFilter;
