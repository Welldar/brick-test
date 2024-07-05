import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './routes/layout'
import { Root } from './routes/root/root'
import { RootLoader } from './routes/root/rootLoader'
import { Character } from './routes/root/character/[id]/character'
import { CharacterLoader } from './routes/root/character/[id]/characterLoader'

const router = createBrowserRouter(
  [
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Root />,
          loader: RootLoader,
        },
        {
          path: '/character/:id',
          element: <Character />,
          loader: CharacterLoader,
        },
      ],
    },
  ],
  { basename: import.meta.env.DEV ? '/' : '/brick-test/' }
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
