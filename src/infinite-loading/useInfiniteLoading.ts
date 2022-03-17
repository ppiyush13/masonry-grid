import { useEffect, useRef, useState } from 'react';

export const useInfiniteLoading = <Data extends unknown, Ref extends unknown>(
  fetcher: () => Promise<Data[]>,
) => {
  const loaderRef = useRef<Ref>(null);
  const [data, setData] = useState<Data[]>([]);

  useEffect(() => {
    const executeEffect = async () => {
      const data = await fetcher();
      setData(data);
    };

    executeEffect();
  }, []);

  return { data, loaderRef };
};
