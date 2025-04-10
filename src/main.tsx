import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router";
import App from './pages/App'
import Details from './pages/Details';
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    // loader: rootLoader,
    children: [
      {
        index: true,
        Component: App,
      },
      {
        path: ":id",
        Component: Details,
        // loader: teamLoader,
      },
    ],
  },
]);


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
