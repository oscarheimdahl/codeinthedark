import { StrictMode } from 'react';

import { createRoot } from 'react-dom/client';

import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { CodePage } from './routes/Codepage/CodePage';
import { CreatePage } from './routes/CreatePage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <CodePage />,
    errorElement: <div>wow</div>,
  },
  {
    path: '/create',
    element: <CreatePage />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
