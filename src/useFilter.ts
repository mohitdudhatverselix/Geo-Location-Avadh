import { useEffect } from 'react';

interface BungalowData {
  [key: string]: {
    category?: string;
    number: string;
  };
}

interface Option {
  value: string;
  label: string;
}

const useFilter = (
  data: BungalowData,
  category: string | null,
  setFilterData: (options: Option[]) => void
): void => {
  useEffect(() => {
    if (category) {
      const filteredOptions: Option[] = Object.keys(data)
        .filter((key) => data[key].category === category)
        .map((key) => ({
          value: key,
          label: data[key].number,
        }));
      setFilterData(filteredOptions);
    }
  }, [data, category, setFilterData]);
};

export default useFilter;

