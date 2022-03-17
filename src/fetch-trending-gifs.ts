/* create `giphy` url */
const giphyUrl = new URL('https://api.giphy.com/v1/gifs/trending');

/* set api_key query param */
giphyUrl.searchParams.set('api_key', import.meta.env.VITE_GIPHY_API_KEY);

export const fetchGIFs = (pageSize = 50) => {
  let pageNumber = 0;

  return async () => {
    /* set `limit` and `offset` query params */
    giphyUrl.searchParams.set('limit', pageSize.toString());
    giphyUrl.searchParams.set('offset', (pageNumber * pageSize + 1).toString());

    /* increment pageNumber for next iteration */
    pageNumber += 1;

    const response = await fetch(giphyUrl.toString());

    const { data } = await response.json();
    return data;
  };
};
