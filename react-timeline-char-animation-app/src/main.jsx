import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {Bebop} from './components/Bebop';
import '@fontsource/inter';
import './styles/index.scss';
import {useEffect, useState} from 'react';
import {Button} from '@mui/material';

const App = () => {
  const [tik, setTik] = useState(null);

  const handleDo = (e) => {
    setTik(new Date());
  };

  return (
    <>
      <Button
        variant={`outlined`}
        className={css`
          position: fixed;
          top: 1rem;
          left: 1rem;
        `}
        onClick={handleDo}
      >{`Do`}</Button>
      <div
        className={css`
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          min-height: 100vh;
        `}
      >
        <h2>Hello</h2>
        <Bebop tik={tik} />
      </div>
    </>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
