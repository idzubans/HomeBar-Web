import Link from "next/link";
import { Drink } from "~/model";

interface Props {
  drinks: Drink[];
}

function DrinkList({ drinks }: Props) {
  return (
    <div className="m-auto flex flex-col items-center gap-4">
      {drinks.map((drink: Drink) => (
        <Link
          className="w-full"
          scroll={false}
          key={drink.id}
          href={`/drink/${drink.id}`}
        >
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
                    <div key={category.id}>
                      {/* <JiggerIcon /> */}
                      <li>{category.name}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DrinkList;
