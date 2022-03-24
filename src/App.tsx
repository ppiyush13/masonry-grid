import { version as reactDOMVersion } from 'react-dom';
import { useEffect, version as reactVersion } from 'react';
import { createTrendingGifsFetcher } from './giphy-client';
import { useInfiniteLoading } from './infinite-loading/useInfiniteLoading';
import {
  MasonryGrid,
  MasonryGridIdle,
  ReactMasonryGrid,
  ReactMasonryGridLazy,
} from './masonry-grid';
import { Route, Routes } from 'react-router-dom';
import { Home } from './Home';

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
      <Routes>
        <Route path={'/'} element={<Home />} />
        <Route path={'/react'} element={<ReactMasonryGrid data={data} />} />
        <Route path={'/javascript'} element={<MasonryGrid data={data} />} />
        <Route
          path={'/javascript-idle'}
          element={<MasonryGridIdle data={data} />}
        />
        <Route
          path={'react-lazy'}
          element={<ReactMasonryGridLazy data={data} />}
        />
      </Routes>

      <div ref={loaderRef} style={{ height: '1px' }}></div>
    </main>
  );
}
