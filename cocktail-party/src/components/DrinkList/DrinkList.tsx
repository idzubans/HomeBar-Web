import { motion } from "framer-motion";
import Link from "next/link";
import { Drink } from "~/model";

interface Props {
  drinks: Drink[];
}

function DrinkList({ drinks }: Props) {
  return (
    <motion.div className="m-auto flex flex-col items-center gap-4">
      {drinks.map((drink: Drink, index: number) => (
        <motion.div
          className="w-11/12"
          key={drink.id}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
        >
          <Link scroll={false} key={drink.id} href={`/drink/${drink.id}`}>
            <div className="flex h-28 w-full content-start items-center rounded-3xl bg-white text-center shadow-xl">
              <div className="flex h-full w-28 items-center justify-center rounded-3xl bg-white shadow-lg">
                <img
                  className="h-full w-full rounded-3xl object-cover shadow"
                  src={drink.imageUrl}
                  alt={drink.name}
                />
              </div>
              <h3 className="flex w-2/3 justify-center bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text text-xl font-extrabold text-transparent">
                {drink.name}
              </h3>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default DrinkList;
