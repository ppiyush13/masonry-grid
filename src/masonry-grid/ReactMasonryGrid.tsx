import { useEffect, useRef, useState } from 'react';

export const ReactMasonryGrid = ({ data }: { data: Trending[] }) => {
  const currentIndex = useRef(0);
  const heights = useRef([0, 0, 0, 0]);
  const [lanes, setLanes] = useState<Array<JSX.Element[]>>(() =>
    new Array(4).fill(null).map(() => []),
  );

  useEffect(() => {
    const getHeight = (media: GiphyMedia) =>
      (16 + +media.height) / +media.width;

    const nextBucket = () => {
      const h = heights.current;
      let minIndex = 0;
      let min = h[0];
      for (let i = 1; i < h.length; i++) {
        if (h[i] < min) {
          min = h[i];
          minIndex = i;
        }
      }

      return minIndex;
    };

    console.time('start');
    const updatesLanes = [...lanes];
    for (let index = currentIndex.current; index < data.length; index++) {
      const dataItem = data[index].images;
      const bucketIndex = nextBucket();
      updatesLanes[bucketIndex].push(<Video key={index} dataItem={dataItem} />);
      //updatesLanes[bucketIndex].push(<Gifs key={index} dataItem={dataItem} />);

      heights.current[bucketIndex] += getHeight(dataItem.downsized_small);
    }

    setLanes(updatesLanes);
    currentIndex.current = data.length;
    console.timeEnd('start');
  }, [data]);

  return (
    <div className="grid-pane">
      <div className="lane">{lanes[0]}</div>
      <div className="lane">{lanes[1]}</div>
      <div className="lane">{lanes[2]}</div>
      <div className="lane">{lanes[3]}</div>
    </div>
  );
};

const Video = ({ dataItem }: { dataItem: Trending['images'] }) => {
  return (
    <video
      src={dataItem.downsized_small.mp4}
      autoPlay
      muted
      loop
      width="100%"
      preload="none"
      crossOrigin1="anonymous"
      style={{
        aspectRatio: `${dataItem.downsized_small.width} / ${dataItem.downsized_small.height}`,
        backgroundColor: getColor(),
      }}
    ></video>
  );
};

const Gifs = ({ dataItem }: { dataItem: Trending['images'] }) => {
  return (
    <img
      src={dataItem.downsized.url}
      width="100%"
      loading="lazy"
      crossOrigin="anonymous"
      style={{
        aspectRatio: `${dataItem.downsized_small.width} / ${dataItem.downsized_small.height}`,
        backgroundColor: getColor(),
      }}
    ></img>
  );
};

const getColor = () => {
  const colors = [
    'rgb(255, 243, 92)',
    'rgb(255, 102, 102)',
    'rgb(153, 51, 255)',
    'rgb(0, 255, 153)',
    'rgb(0, 204, 255)',
  ];

  const random = Math.floor(Math.random() * 100) % colors.length;
  return colors[random];
};
