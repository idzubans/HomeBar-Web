import Link from "next/link";
import { Drink } from "~/model";

interface Props {
  drinks: Drink[];
}

function DrinkCard({ drinks }: Props) {
  return (
    <div className="m-auto flex flex-col items-center gap-4">
      {drinks.map((drink: Drink) => (
        <Link
          className="w-11/12"
          scroll={false}
          key={drink.id}
          href={`/drink/${drink.id}`}
        >
          <div className="flex h-28 w-full content-start items-center rounded-3xl bg-white text-center shadow-xl">
            <div className="flex h-full w-28 items-center justify-center rounded-3xl bg-white shadow-lg">
              <img
                className="h-full w-full rounded-3xl object-cover shadow"
                src={drink.imageUrl}
                alt={drink.name}
              />
            </div>
            <h3 className="flex w-2/3 justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-2xl font-extrabold text-transparent">
              {drink.name}
            </h3>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default DrinkCard;
