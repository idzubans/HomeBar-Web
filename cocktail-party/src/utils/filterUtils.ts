import { ParsedUrlQuery } from "querystring";

export const getFilterCount = (query: ParsedUrlQuery) => {
  let count = 0;
  count += countFilterItem(query.categories);
  count += countFilterItem(query.ingredients);

  return count;
};

function countFilterItem(items: any) {
  let count = 0;
  if (items) {
    if (Array.isArray(items)) {
      count += items.length;
    } else {
      count += 1;
    }
  }
  return count;
}