import { router } from "@trpc/server";
import { getCookie } from "cookies-next";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Button } from "~/components/shared/Button";
import { Drink } from "~/model";
import { prisma } from "~/server/db";
import { getDrinkById, getDrinks } from "~/server/domain/drink";

interface Props {
  drink: Drink;
}

function DrinkDetail({ drink }: Props) {
  const router = useRouter();

  const onDrinkOrdered = (id: string) => {
    const userIdCookie = getCookie("guestId");
    const partyIdCookie = getCookie("partyId");

    console.log("Ordering drink:", id);
    console.log("Party:", partyIdCookie);
    console.log("For the user:", userIdCookie);

  };

  return (
    <div className="flex min-h-screen justify-center bg-gradient-to-br from-indigo-100">
      <div className="flex w-full flex-col items-center bg-white text-center shadow-lg">
        <div className="w-full rounded-b-3xl bg-white shadow-lg">
          <img
            src={drink.imageUrl}
            alt={drink.name}
            className="h-full w-full rounded-b-3xl object-cover"
          />
        </div>
        <div className="w-full px-4">
          <h1 className="inline-block bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text py-8 text-5xl font-extrabold text-transparent">
            {drink.name}
          </h1>
          <div className="flex justify-center gap-8 py-4 text-start text-lg">
            <ul className="list-disc">
              {drink.ingredients.map((i) => (
                <li className="py-1" key={i.name}>
                  {i.name}
                </li>
              ))}
            </ul>
            <ul className="list-disc">
              {drink.categories.map((category) => (
                <div key={category.id}>
                  {/* <JiggerIcon /> */}
                  <li className="py-1">{category.name}</li>
                </div>
              ))}
            </ul>
          </div>
          <div className="flex justify-center py-4">
            <Button
              isPrimary={true}
              onClick={() => {
                onDrinkOrdered(drink.id);
              }}
            >
              Order this drink
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticPaths() {
  const drinks = await getDrinks(prisma, {});
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
