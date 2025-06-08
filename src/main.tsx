import './index.css';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
import NotFaqApp from './app/NotFaqApp.tsx';
import {store} from './app/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <HashRouter>
        <NotFaqApp />
      </HashRouter>
    </Provider>
  </>
);
