import { useEffect } from 'react';
import { createTrendingGifsFetcher } from './giphy-client';

const fetchTrendingGifs = createTrendingGifsFetcher();

export default function App() {
  useEffect(() => {
    const executeEffect = async () => {
      {
        const data = await fetchTrendingGifs();
        console.log(data);
      }

      {
        const data = await fetchTrendingGifs();
        console.log(data);
      }
    };

    executeEffect();
  }, []);

  return <div className={'App'}>Simple</div>;
}
