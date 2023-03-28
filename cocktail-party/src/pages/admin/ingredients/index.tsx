import { useSession } from "next-auth/react";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { Ingredient } from "~/model";
import axios from "axios";
import { Button } from "~/components/shared/Button";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  return await response.json();
};

const updateStock = async (url: string, { arg }: { arg: Ingredient[] }) => {
  const response = await axios.put(url, arg);
  const ingredients = await response.data;
  return ingredients;
};

function Ingredients() {
  const { data: session, status } = useSession();

  const {
    data: ingredients,
    isLoading,
    mutate,
  } = useSWR<Ingredient[]>(
    () => session && `/api/admin/ingredients?userId=${session?.user.id}`,
    fetcher
  );

  const { trigger, isMutating } = useSWRMutation(
    `/api/admin/ingredients?userId=${session?.user.id}`,
    updateStock /* options */
  );

  const [changedIngredients, setChangedIngredients] = useState<string[]>([]);

  const changedAvailability = (id: string) => {
    if (changedIngredients.includes(id)) {
      setChangedIngredients((prev) => {
        return prev.filter((x) => x !== id);
      });
    } else {
      setChangedIngredients((prev) => {
        return [...prev, id];
      });
    }
  };

  const saveIngredients = async () => {
    if (changedIngredients.length === 0) {
      return;
    }

    const changedIngredientsData = ingredients?.filter((i) =>
      changedIngredients.includes(i.id)
    );
    if (!changedIngredientsData) {
      return;
    }

    await trigger(changedIngredientsData);
    mutate();
    setChangedIngredients([]);
  };

  if (isLoading) {
    return <div>LOADING ANIMATION</div>;
  }
  return (
    <div className="p-8 flex flex-col gap-4">
      <h1>Update your bar stock</h1>
      {ingredients &&
        ingredients.map((ingredient) => (
          <div className="flex gap-4" key={ingredient.id}>
            <input
              key={ingredient.id}
              type="checkbox"
              checked={
                (ingredient.isAvailable &&
                  !changedIngredients.includes(ingredient.id)) ||
                (!ingredient.isAvailable &&
                  changedIngredients.includes(ingredient.id))
              }
              onChange={() => changedAvailability(ingredient.id)}
            />
            {ingredient.name}
          </div>
        ))}
      <Button isPrimary={false} onClick={saveIngredients}>Save</Button>
    </div>
  );
}

export default Ingredients;
