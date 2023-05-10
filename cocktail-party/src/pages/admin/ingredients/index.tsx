import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { Button } from "~/components/shared/Button";
import { api } from "~/utils/api";

function Ingredients() {
  const {
    data: ingredients,
    isLoading,
    refetch,
  } = api.ingredients.getByUserId.useQuery();
  const { mutate } = api.ingredients.update.useMutation({
    onSuccess() {
      refetch();
      setChangedIngredients([]);
    },
  });

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

  const saveIngredients = () => {
    if (changedIngredients.length === 0) {
      return;
    }

    const changedIngredientsData = ingredients?.filter((i) =>
      changedIngredients.includes(i.id)
    );
    if (!changedIngredientsData) {
      return;
    }

    mutate(changedIngredientsData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen w-screen bg-gradient-to-t from-indigo-100 flex items-center justify-center">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 p-8">
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
      <Button isPrimary={false} onClick={saveIngredients}>
        Save
      </Button>
    </div>
  );
}

export default Ingredients;
