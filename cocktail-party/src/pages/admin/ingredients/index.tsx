import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { Button } from "~/components/shared/Button";
import { api } from "~/utils/api";

function Ingredients() {
  const context = api.useContext();
  const { data: ingredients, isLoading } = api.ingredients.getByUserId.useQuery(
    undefined,
    {
      refetchOnWindowFocus: false,
      onSuccess() {
        if (changedIngredients.length > 0) {
          setChangedIngredients([]);
        }
      },
    }
  );

  const { mutate, isLoading: isMutating } = api.ingredients.update.useMutation({
    onSuccess() {
      context.ingredients.getByUserId.invalidate();
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

  if (isLoading || isMutating) {
    return (
      <div className="flex min-h-screen w-screen items-center justify-center bg-gradient-to-t from-indigo-100">
        <SyncLoader color={"#4338ca"} size={20} aria-label="Loading Spinner" />
      </div>
    );
  } else if (ingredients) {
    const categories = [...new Set(ingredients.map((x) => x.category))];

    const ingredientsByCategory = categories.map((c) => {
      return {
        title: c,
        elements: ingredients.filter((i) => i.category === c),
      };
    });

    return (
      <div className="flex flex-col gap-4 p-8">
        <h1>Update your ingredients inventory</h1>
        {ingredientsByCategory.map((cat) => (
          <div>
            <span>{cat.title}</span>
            {cat.elements.map((ingredient) => (
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
          </div>
        ))}
        <Button isPrimary={false} onClick={saveIngredients}>
          Save
        </Button>
      </div>
    );
  }
}

export default Ingredients;
