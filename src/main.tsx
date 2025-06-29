import './assets/scss/index.scss';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Router';
import { store } from './store';
import AuthListener from './AuthListener';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthListener />
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
