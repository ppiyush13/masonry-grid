import { useEffect, useState } from 'react';
import { createTrendingGifsFetcher } from './giphy-client';
import { MasonryGrid } from './masonry-grid';

const fetchTrendingGifs = createTrendingGifsFetcher();

export default function App() {
  const [data, setData] = useState<Trending[]>([]);

  useEffect(() => {
    const executeEffect = async () => {
      const data = await fetchTrendingGifs();
      setData(data);
    };

    executeEffect();
  }, []);

  return (
    <div className={'App'}>
      <MasonryGrid data={data} />
    </div>
  );
}
