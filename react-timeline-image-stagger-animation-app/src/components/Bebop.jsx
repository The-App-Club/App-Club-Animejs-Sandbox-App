import {css} from '@emotion/css';
import {useState, useRef, useMemo, createRef} from 'react';
import anime from 'animejs';
import {motion, transform} from 'framer-motion';

const Bebop = () => {
  const [height, setHeight] = useState(0);

  const imagesDomRef = useMemo(() => {
    return [...Array(10).keys()].map((n) => {
      return createRef();
    });
  }, []);

  const handleDo = (e) => {
    const dom = e.target;
    const {top, left, width, height} = dom.getBoundingClientRect();
    const x = transform([0, width], [0, 100])(e.clientX - left);
    const y = transform([0, height], [0, 100])(e.clientY - top);
    const imageDomList = imagesDomRef.map((imageDomRef) => {
      return imageDomRef.current;
    });
    const tl = anime.timeline({
      easing: 'easeOutExpo',
      duration: 1200,
      endDelay: 500,
      direction: 'alternate',
      complete: function (anim) {
        console.log(`done`);
        // tl.seek(0);
        // tl.reverse();
      },
    });

    tl.add({
      targets: imageDomList,
      transformOrigin: `${x}% ${y}%`,
      scale: function (el, i, l) {
        return (l - i) / l;
      },
      delay: anime.stagger(100), // increase delay by 100ms for each elements.
    });
  };

  return (
    <div
      className={css`
        position: relative;
        width: 700px;
        @media (max-width: 768px) {
          width: 300px;
        }
        height: ${height}px;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
      onClick={handleDo}
    >
      {[...Array(10).keys()].map((n, i) => {
        return (
          <motion.img
            key={i}
            onLoad={(e) => {
              const dom = e.target;
              if (height === 0) {
                setHeight(dom.height);
              }
            }}
            ref={imagesDomRef[i]}
            className={css`
              width: 100%;
              position: absolute;
              top: 0;
              left: 0;
              display: block;
              max-width: 100%;
              object-fit: cover;
            `}
            src={`https://picsum.photos/seed/${223}/1920/1200`}
            alt=""
          />
        );
      })}
    </div>
  );
};

export {Bebop};
