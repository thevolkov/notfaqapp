import './index.css';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {HashRouter} from 'react-router-dom';
// import {BrowserRouter} from 'react-router-dom';
import NotFaq from './app/NotFaq.tsx';
import {store} from './app/store.ts';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <Provider store={store}>
      <HashRouter>
        <NotFaq />
      </HashRouter>
    </Provider>
  </>
);
