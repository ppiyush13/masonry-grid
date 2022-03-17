import { useEffect, useRef } from 'react';
import './Grid.css';

interface MasonryGridType<T> {
  data: T[];
}

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

const getHeight = (dataItem) => {
  return (16 + +dataItem.height) / dataItem.width;
};

const createElement = (images) => {
  const element = document.createElement('div');
  const dataItem = images.downsized_small;
  const url = dataItem.mp4;
  const innerHTML = `
    <video
      src="${url}"
      autoplay
      muted
      loop
      width="100%"
      title={title}
      preload="none"
      style="aspect-ratio: ${dataItem.width} / ${
    dataItem.height
  }; background-color: ${getColor()}"
    ></video>
  `;

  // const innerHTML = `
  //   <img
  //     src="${images.downsized_still.url}"
  //     width="100%"
  //     loading="lazy"
  //     onload1="console.log('loaded')"
  //     style="aspect-ratio: ${dataItem.width} / ${
  //   dataItem.height
  // }; background-color: ${getColor()}"
  //   ></img>
  // `;

  // const innerHTML = `
  //   <div style="background-color: yellow; width: 100%; aspect-ratio: ${dataItem.width} / ${dataItem.height}"></div>
  // `;

  //return innerHTML;
  element.innerHTML = innerHTML;

  return element;
};

export const MasonryGrid = <T extends unknown>({
  data,
}: MasonryGridType<T>) => {
  const refA = useRef();
  const refB = useRef();
  const refC = useRef();
  const refD = useRef();
  const currentIndex = useRef(0);
  const heights = useRef([0, 0, 0, 0]);

  useEffect(() => {
    if (!data || data.length === 0) return;
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

    const refs = [refA, refB, refC, refD];

    console.time('start');
    let stringItems = new Array(4).fill('');
    let items = new Array(4)
      .fill(null)
      .map(() => document.createDocumentFragment());

    for (let index = currentIndex.current; index < data.length; index++) {
      //requestAnimationFrame(() => {
      const dataItem = data[index].images;
      const bucketIndex = nextBucket();
      // refs[bucketIndex].current.append(
      //   createElement(dataItem).firstElementChild
      // );
      //refs[bucketIndex].current.innerHTML += createElement(dataItem);
      //stringItems[bucketIndex] += createElement(dataItem);
      items[bucketIndex].appendChild(createElement(dataItem).firstElementChild);
      heights.current[bucketIndex] += getHeight(dataItem.downsized_small);
      //});
    }
    //refs[bucketIndex].current.innerHTML += items;
    refs.forEach((ref, index) => {
      //ref.current.innerHTML += stringItems[index];
      ref.current.appendChild(items[index]);
    });
    console.timeEnd('start');
    currentIndex.current = data.length;
  }, [data]);

  return (
    <>
      <div className="grid-pane">
        <div className="lane" ref={refA}></div>
        <div className="lane" ref={refB}></div>
        <div className="lane" ref={refC}></div>
        <div className="lane" ref={refD}></div>
      </div>
      <div style={{ height: '1px' }}></div>
    </>
  );
};
