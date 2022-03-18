interface GiphyMedia {
  height: string;
  width: string;
}

interface GiphyMP4 extends GiphyMedia {
  mp4: string;
}

interface Trending {
  id: string;
  images: {
    downsized_small: GiphyMP4;
  };
}
