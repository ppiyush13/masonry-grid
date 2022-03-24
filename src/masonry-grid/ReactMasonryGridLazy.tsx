import { useEffect, useRef, useState } from 'react';

export const ReactMasonryGridLazy = ({ data }: { data: Trending[] }) => {
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

function isElementInViewport(el: Element) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}

const intersectionObserver = new IntersectionObserver(async (entries) => {
  //console.log(entries);
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.innerHTML = `
          <video
            src=${entry.target.getAttribute('data-url')}
            autoPlay
            muted
            loop
            height="100%"
            width="100%"
            preload="none"
            crossOrigin="anonymous"
            style="height:100%;width:100%;"
          />
        `;
    } else {
      entry.target.innerHTML = '';
    }

    //});
    // if (ref.current == null) return;
    // if (entries[0].isIntersecting) {
    //   ref.current.innerHTML = `
    //     <video
    //       src=${dataItem.downsized_small.mp4}
    //       autoPlay
    //       muted
    //       loop
    //       width="100%"
    //       preload="none"
    //       crossOrigin="anonymous"
    //     />
    //   `;
    // } else {
    //   ref.current.innerHTML = '';
    // }
  });
});

const Video = ({ dataItem }: { dataItem: Trending['images'] }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current == null) return;
    intersectionObserver.observe(ref.current);

    return () => {
      if (ref.current) {
        intersectionObserver.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div
      ref={ref}
      data-url={dataItem.downsized_small.mp4}
      style={{
        display: 'flex',
        width: '100%',
        aspectRatio: `${dataItem.downsized_small.width} / ${dataItem.downsized_small.height}`,
        backgroundColor: getColor(),
      }}
    ></div>
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
