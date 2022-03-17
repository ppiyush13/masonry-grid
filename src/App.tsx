import { createTrendingGifsFetcher } from './giphy-client';
import { useInfiniteLoading } from './infinite-loading/useInfiniteLoading';
import { MasonryGrid } from './masonry-grid';

const fetchTrendingGifs = createTrendingGifsFetcher();

export default function App() {
  const { data, loaderRef } = useInfiniteLoading<Trending, HTMLDivElement>(
    fetchTrendingGifs,
  );

  return (
    <main className={'App'}>
      <MasonryGrid data={data} />
      <div ref={loaderRef} style={{ height: '1px' }}></div>
    </main>
  );
}
