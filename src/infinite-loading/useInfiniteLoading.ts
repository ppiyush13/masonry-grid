import { useEffect, useRef, useState } from 'react';

export const useInfiniteLoading = <
  Data extends unknown,
  Ref extends HTMLElement,
>(
  fetcher: () => Promise<Data[]>,
) => {
  const loaderRef = useRef<Ref>(null);
  const [data, setData] = useState<Data[]>([]);

  /* intersection observer */
  useEffect(() => {
    /* early exist if loaderRef is not assigned */
    if (loaderRef.current == null) return;

    /* create intersection observer */
    const intersectionObserver = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting) {
          const data = await fetcher();
          setData((prevData) => prevData.concat(data));
        }
      },
      { rootMargin: '20%' },
    );

    intersectionObserver.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        intersectionObserver.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef.current]);

  return { data, loaderRef };
};
