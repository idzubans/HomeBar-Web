import { motion } from "framer-motion";

interface CardProps {
  isSelected: boolean;
}

interface Props {
  name: string;
  isSelected: boolean;
  onToggle(): void;
  index: number;
}

function FilterCard({ index, name, isSelected, onToggle }: Props) {
  return (
    <motion.div
      transition={{ delay: 0.04 * index }}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className={`flex h-8 min-w-[40px] items-center justify-center rounded-lg py-0 px-3  text-xs font-semibold shadow-md
      ${
        isSelected
          ? "bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 text-white"
          : "border-purple-800 bg-white text-purple-800"
      }`}
      onClick={onToggle}
    >
      {name}
    </motion.div>
  );
}

export default FilterCard;
