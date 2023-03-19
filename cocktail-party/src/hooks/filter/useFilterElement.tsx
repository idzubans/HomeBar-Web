import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export interface IFilterElement {
  selectedItems: string[];
  toggleItem(item: string): void;
  resetFilter(): void;
}

export const useFilterElement = (itemsName: 'categories' | 'ingredients'): IFilterElement => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const router = useRouter();
  const activeFilter = router.query[itemsName];

  useEffect(() => {
    if (activeFilter) {
      if (Array.isArray(activeFilter)) {
        setSelectedItems([...activeFilter]);
      } else {
        setSelectedItems([activeFilter]);
      }
    }
  }, [activeFilter]);

  const toggleItem = (item: string) => {
    if (!selectedItems?.includes(item)) {
      setSelectedItems((previousState) => {
        if (previousState) {
          return [...previousState, item];
        } else {
          return [item];
        }
      });
    } else {
      setSelectedItems((x) => x!.filter((c) => c !== item));
    }
  };

  const resetFilter = () => {
    setSelectedItems([]);
  }

  return {selectedItems, toggleItem, resetFilter};
}

