interface MasonryGridType<T> {
  data: T[];
}

export const MasonryGrid = <T extends unknown>({
  data,
}: MasonryGridType<T>) => {
  return <div>Masonry grid</div>;
};
