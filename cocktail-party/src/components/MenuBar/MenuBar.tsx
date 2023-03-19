import { FilterIcon } from "~/icons/FilterIcon";
import { Input } from "../shared/Input";

interface Props {
  onFilterClicked(): void;
  filterCount: number;
}

function MenuBar({ onFilterClicked, filterCount }: Props) {
  return (
    <div className="mb-4 flex items-center justify-start gap-8 py-8 px-4">
      <Input name="Search" placeHolder="Find a drink" label="" />
      <div className="relative text-purple-800" onClick={onFilterClicked}>
        <FilterIcon />
        {filterCount > 0 && (
          <p className="absolute top-0 left-6 m-0 flex h-5 w-5 items-center justify-center rounded-full bg-purple-800 text-sm text-white">
            {filterCount}
          </p>
        )}
      </div>
    </div>
  );
}

export default MenuBar;
