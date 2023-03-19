import { GetStaticProps } from "next";
import { Button } from "~/components/shared/Button";
import { JiggerIcon } from "~/icons/JiggerIcon";
import { Drink } from "~/model";
import { getDrinkById } from "~/server/drinks/getById";
import { getDrinks } from "~/server/drinks/getDrinks";

interface Props {
  drink: Drink;
}

function DrinkDetail({ drink }: Props) {
  return (
    <div className="flex h-screen justify-center bg-gradient-to-br from-indigo-100">
      <div className="m-auto flex w-11/12 flex-col items-center rounded-3xl bg-white text-center shadow-lg">
        <div className="w-full rounded-3xl bg-white shadow-lg">
          <img
            src={drink.imageUrl}
            alt={drink.name}
            className="h-full w-full rounded-3xl object-cover"
          />
        </div>
        <div className="w-full">
          <h1 className="inline-block bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text py-4 text-5xl font-extrabold text-transparent">
            {drink.name}
          </h1>
          <div className="flex justify-center gap-8 py-4 text-start text-lg">
            <ul>
              {drink.ingredients.map((i) => (
                <li key={i.name}>{i.name}</li>
              ))}
            </ul>
            <ul>
              {drink.categories.map((category) => (
                <div>
                  {/* <JiggerIcon /> */}
                  <li key={category.name}>{category.name}</li>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex justify-center py-4">
            <Button
              isPrimary={true}
              onClick={() => {
                console.log("drink ordered");
              }}
            >
              I want it
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const drinks = await getDrinks({});
  const paths = drinks.map((drink: Drink) => ({
    params: { id: drink.id },
  }));
  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const id = context.params?.id as string;
  const drink = await getDrinkById(id);
  return { props: { drink } };
};

export default DrinkDetail;
