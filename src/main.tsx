import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import {StandaloneDiplomaPage} from './components/games/StandaloneDiplomaPage.tsx';
import './index.css';

const isStandaloneDiploma =
  typeof window !== 'undefined' &&
  new URLSearchParams(window.location.search).get('oklevel-nyomtatas') === '1';

createRoot(document.getElementById('root')!).render(
  isStandaloneDiploma ? <StandaloneDiplomaPage /> : <App />
);
