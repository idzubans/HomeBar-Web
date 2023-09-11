import { useState } from "react";
import { SyncLoader } from "react-spinners";
import { Button } from "~/components/shared/Button";
import { api } from "~/utils/api";
import { Switch } from "~/components/ui/switch";
import { useRouter } from "next/router";

function Ingredients() {
  const router = useRouter();
  const { id } = router.query;

  const context = api.useContext();
  const { data: ingredients, isLoading } = api.ingredients.getByBarId.useQuery(
    { id: id as string },
    {
      enabled: !!id,
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
      context.ingredients.getByBarId.invalidate();
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

    mutate({barId: id as string,ingredients: changedIngredientsData});
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
      <div className="flex flex-col p-8">
        <h1 className="text-center text-2xl font-semibold text-purple-950">
          Update your ingredients inventory
        </h1>
        {ingredientsByCategory.map((cat) => (
          <div
            key={cat.title}
            className="my-4 flex flex-col gap-2 rounded-lg border-2 border-purple-300 p-4 shadow-lg"
          >
            <h2 className="pb-2 text-center text-xl font-semibold text-purple-950">
              {cat.title}
            </h2>
            {cat.elements.map((ingredient) => (
              <div className="flex gap-4" key={ingredient.id}>
                <Switch
                  checked={
                    (ingredient.isAvailable &&
                      !changedIngredients.includes(ingredient.id)) ||
                    (!ingredient.isAvailable &&
                      changedIngredients.includes(ingredient.id))
                  }
                  onCheckedChange={() => changedAvailability(ingredient.id)}
                />
                {ingredient.name}
              </div>
            ))}
          </div>
        ))}
        <Button isPrimary={true} onClick={saveIngredients}>
          Save
        </Button>
      </div>
    );
  }
}

export default Ingredients;
