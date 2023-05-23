import { FilterIcon } from "~/icons/FilterIcon";
import { Input } from "../shared/Input";

interface Props {
  onFilterClicked(): void;
  filterCount: number;
}

function MenuBar({ onFilterClicked, filterCount }: Props) {
  return (
    <div className="flex items-center justify-end px-4 gap-8 sticky top-[90vh]">
      {/* <Input name="Search" placeHolder="Find a drink" label="" /> */}
      <div className=" text-white rounded-full bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700 p-2" onClick={onFilterClicked}>
        <FilterIcon />
        {filterCount > 0 && (
          <p className="m-0 flex h-5 w-5 items-center justify-center rounded-full bg-white text-sm text-black">
            {filterCount}
          </p>
        )}
      </div>
    </div>
  );
}

export default MenuBar;
