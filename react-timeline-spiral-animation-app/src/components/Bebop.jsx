import {css, cx} from '@emotion/css';
import {useState, useRef, useMemo, createRef, useEffect} from 'react';
import anime from 'animejs';
import {motion, transform} from 'framer-motion';

import * as d3 from 'd3';

const Bebop = ({tik}) => {
  const [resized, setResized] = useState(new Date());

  const containerDomRef = useRef(null);

  const itemCount = useMemo(() => {
    return 40;
  }, []);

  const itemsDomRef = useMemo(() => {
    return [...Array(itemCount).keys()].map((n) => {
      return createRef();
    });
  }, []);

  const tl = useMemo(() => {
    return anime.timeline({
      autoplay: false,
      duration: 900, // デフォルト
      endDelay: 300,
      direction: `alternate`,
    });
  }, [resized]);

  const handleResize = (e) => {
    tl.pause();
    tl.seek(0);
    setResized(new Date());
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // https://animejs.com/documentation/#propertyKeyframes
    // https://animejs.com/documentation/#timelineOffsets
    const containerDom = containerDomRef.current;
    const {top, left, width, height} = containerDom.getBoundingClientRect();
    const cx = width / 2 - 20;
    const cy = height / 2 - 20;
    tl.add({
      targets: '.item',
      translateX: {
        value: (element, index) => {
          let cos = Math.cos(((2 * Math.PI) / (itemCount - 1)) * index);
          return cx + cos * ((240 * index) / (itemCount - 1));
        },
        duration: 1,
      },
      translateY: {
        value: (element, index) => {
          let sin = Math.sin(((2 * Math.PI) / (itemCount - 1)) * index);
          return cy + sin * ((240 * index) / (itemCount - 1));
        },
        duration: 1,
      },
      scale: {
        value: [0, 1],
        delay: (element, index) => {
          return (600 * index) / (itemCount - 1);
        },
        duration: 1000,
      },
      opacity: {
        value: (element, index) => {
          return 1; //1 - (index / (itemCount - 1));
        },
      },
      elasticity: 700,
    });
  }, [resized]);

  useEffect(() => {
    if (!tik) {
      return;
    }
    tl.play();
  }, [tik]);

  return (
    <div
      ref={containerDomRef}
      className={css`
        position: relative;
        overflow: hidden;
        width: 100%;
        max-width: 60rem;
        @media (max-width: 768px) {
          max-width: 100%;
        }
        @media (max-width: 768px) and (orientation: portrait) {
          max-width: 30rem;
        }
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid;
        height: 100%;
      `}
    >
      <div
        className={css`
          position: relative;
          width: 100%;
          min-height: 40rem;
          @media (max-width: 768px) {
            min-height: 20rem;
          }
        `}
      >
        {[...Array(itemCount).keys()].map((n) => {
          return (
            <div
              key={n}
              className={cx(
                `item`,
                css`
                  position: absolute;
                  top: 0;
                  left: 0;
                  opacity: 0;
                  width: 160px;
                  height: 160px;
                  background-color: ${d3.interpolateBlues(
                    transform([0, itemCount - 1], [0, 1])(n)
                  )};
                `
              )}
              ref={itemsDomRef[n]}
            />
          );
        })}
      </div>
    </div>
  );
};

export {Bebop};
