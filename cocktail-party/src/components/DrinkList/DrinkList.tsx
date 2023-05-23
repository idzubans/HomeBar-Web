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
          key={drink.id}
          transition={{ delay: 0.1 * index, duration: 0.3 }}
          initial={{ opacity: 0, x: -200 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 200 }}
        >
          <Link className="w-full" scroll={false} href={`/drink/${drink.id}`}>
            <div className="m-auto flex w-11/12 flex-col items-center rounded-3xl bg-white text-center shadow-lg">
              <div className="w-full rounded-3xl bg-white shadow-lg">
                <img
                  src={drink.imageUrl}
                  alt={drink.name}
                  className="h-full w-full rounded-3xl object-cover"
                />
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default DrinkList;
