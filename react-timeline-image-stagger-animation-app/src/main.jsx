import {createRoot} from 'react-dom/client';
import {css} from '@emotion/css';
import {Bebop} from './components/Bebop';
import '@fontsource/inter';
import './styles/index.scss';

const App = () => {
  return (
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
      <Bebop />
    </div>
  );
};

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
