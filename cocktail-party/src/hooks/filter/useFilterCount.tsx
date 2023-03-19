import { useRouter } from "next/router";
import { useMemo } from "react";
import { getFilterCount } from "~/utils/filterUtils";

export const useFilterCount = (): number => {
  const router = useRouter();
  const filterCount = useMemo(
    () => getFilterCount(router.query),
    [router.query]
  );

  return filterCount;
};
