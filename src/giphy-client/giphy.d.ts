interface GiphyMedia {
  height: string;
  width: string;
}

interface GiphyMP4 extends GiphyMedia {
  mp4: string;
}

interface GiphyGIF extends GiphyMedia {
  url: string;
}

interface Trending {
  id: string;
  bitly_gif_url: string;
  images: {
    downsized_small: GiphyMP4;
    downsized: GiphyGIF;
  };
}
