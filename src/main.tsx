import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './routes/layout'
import { Root, RootLoader } from './routes/root'
import { Character, CharacterLoader } from './routes/character'

const router = createBrowserRouter([
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
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
