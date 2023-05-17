import { motion } from "framer-motion";
import Link from "next/link";
import { Drink } from "~/model";

interface Props {
  drinks: Drink[];
}

function DrinkList({ drinks }: Props) {
  return (
    <motion.div className="m-auto flex flex-col items-center gap-4">
      {drinks.map((drink: Drink) => (
        <Link
          className="w-full"
          scroll={false}
          key={drink.id}
          href={`/drink/${drink.id}`}
        >
          <motion.div
            layoutId={drink.id}
            transition={{ duration: 0.8 }}
            // initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            exit={{ scaleX: 1.2 }}
            className="m-auto flex w-11/12 flex-col items-center rounded-3xl bg-white text-center shadow-lg"
          >
            <motion.div layoutId={`img-div-${drink.id}`} className="w-full rounded-3xl bg-white shadow-lg">
              <motion.img
                layoutId={`img-${drink.id}`}
                src={drink.imageUrl}
                alt={drink.name}
                className="h-full w-full rounded-3xl object-cover"
              />
            </motion.div>
            <div className="w-full">
              <motion.h1 layoutId={`h1-${drink.id}`}  className="inline-block bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 bg-clip-text py-4 text-5xl font-extrabold text-transparent">
                {drink.name}
              </motion.h1>
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
          </motion.div>
        </Link>
      ))}
    </motion.div >
  );
}

export default DrinkList;
