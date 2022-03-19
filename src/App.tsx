import { version as reactDOMVersion } from 'react-dom';
import { useEffect, version as reactVersion } from 'react';
import { createTrendingGifsFetcher } from './giphy-client';
import { useInfiniteLoading } from './infinite-loading/useInfiniteLoading';
import { MasonryGrid, ReactMasonryGrid } from './masonry-grid';

const fetchTrendingGifs = createTrendingGifsFetcher();

export default function App() {
  const { data, loaderRef } = useInfiniteLoading<Trending, HTMLDivElement>(
    fetchTrendingGifs,
  );

  useEffect(() => {
    console.log('react version:', reactVersion);
    console.log('react-dom version:', reactDOMVersion);
  }, []);

  return (
    <main className={'App'}>
      <ReactMasonryGrid data={data} />
      <div ref={loaderRef} style={{ height: '1px' }}></div>
    </main>
  );
}
