import {css} from '@emotion/css';
import {useState, useRef, useMemo, createRef, useEffect} from 'react';
import anime from 'animejs';
import {motion, transform} from 'framer-motion';

const Bebop = ({tik}) => {
  const [resized, setResized] = useState(new Date());

  const particlesDomRef = useMemo(() => {
    return [...Array(10).keys()].map((n) => {
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
    tl.add({
      targets: '.char1',
      opacity: 1,
      translateX: [{value: [-150, 0]}],
      scaleX: [{value: [4.75, 1]}],
      easing: 'easeOutExpo',
      duration: 500,
    })
      .add(
        {
          targets: '.char2',
          opacity: 1,
          translateY: [{value: [-150, 0]}],
          scaleY: [{value: [4.75, 1]}],
          easing: 'easeOutExpo',
        },
        '-=800'
      )
      .add(
        {
          targets: '.char3',
          opacity: 1,
          translateY: [{value: [150, 0]}],
          scaleY: [{value: [4.75, 1]}],
          easing: 'easeOutExpo',
          duration: 500,
        },
        '-=600'
      )
      .add(
        {
          targets: '.char4',
          opacity: 1,
          rotate: [{value: [-360, 0]}],
          easing: 'easeOutExpo',
        },
        '-=700'
      )
      .add(
        {
          targets: '.char5',
          opacity: 1,
          rotateX: [{value: [-360, 360]}],
          easing: 'easeOutExpo',
        },
        '-=600'
      )
      .add(
        {
          targets: '.char6',
          opacity: 1,
          rotateY: [{value: [-360, 360]}],
          easing: 'easeOutExpo',
        },
        '-=300'
      )
      .add(
        {
          targets: '.char7',
          opacity: 1,
          translateX: [{value: [150, 0]}],
          scaleX: [{value: [4.75, 1]}],
          easing: 'easeOutExpo',
          duration: 500,
        },
        '-=600'
      )
      .add(
        {
          targets: '.line',
          width:
            window.matchMedia(`(max-width: 768px)`).matches &&
            !window.matchMedia(`(max-width: 768px) and (orientation: portrait)`)
              .matches
              ? `90%`
              : `73%`,
          opacity: 1,
          easing: 'easeOutExpo',
        },
        '+=600'
      );
  }, [resized]);

  useEffect(() => {
    if (!tik) {
      return;
    }
    tl.play();
  }, [tik]);

  return (
    <div
      className={css`
        position: relative;
        overflow: hidden;
        width: 100%;
        background: #222;
        max-width: 30rem;
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
        min-height: 20rem;
        .char {
          font-size: 4rem;
          opacity: 0;
          color: white;
        }
        .line {
          position: absolute;
          left: 4rem;
          @media (max-width: 768px) {
            left: 1rem;
          }
          @media (max-width: 768px) and (orientation: portrait) {
            left: 4rem;
          }
          bottom: 10rem;
          height: 3px;
          width: 0;
          /* width: 70%;
          @media (max-width: 768px) {
            width: 90%;
          } */
          background: white;
        }
      `}
    >
      <div className={`char char1`}>M</div>
      <div className={`char char2`}>O</div>
      <div className={`char char3`}>N</div>
      <div className={`char char4`}>D</div>
      <div className={`char char5`}>A</div>
      <div className={`char char6`}>Y</div>
      <div className={`char char7`}>S</div>
      <div className={`line`} />
    </div>
  );
};

export {Bebop};
