import { useEffect } from 'react';
import { fetchGIFs } from './fetch-trending-gifs';

const fetcher = fetchGIFs();

export default function App() {
  useEffect(() => {
    const executeEffect = async () => {
      {
        const data = await fetcher();
        console.log(data);
      }

      {
        const data = await fetcher();
        console.log(data);
      }
    };

    executeEffect();
  }, []);

  return <div className={'App'}>Simple</div>;
}
