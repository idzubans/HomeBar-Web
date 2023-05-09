interface CardProps {
  isSelected: boolean;
}

interface Props {
  name: string;
  isSelected: boolean;
  onToggle(): void;
}

function FilterCard({ name, isSelected, onToggle }: Props) {
  return (
    <div
      className={`flex h-8 min-w-[40px] justify-center items-center py-0 px-3 rounded-lg  text-xs font-semibold shadow-md
      ${isSelected ? "text-white bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700" : "bg-white text-purple-800 border-purple-800"}`}
      onClick={onToggle}
    >
      {name}
    </div>
  );
}

export default FilterCard;
