import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './routes/App.jsx'
import './styles/global.css'
import { createHashRouter, RouterProvider } from 'react-router-dom'
import ErrorPage from './routes/ErrorPage.jsx'
import Account from './routes/Account.jsx'
import Data from './routes/Data.jsx'
import Index from './routes/Index.jsx'
import AskAi from './routes/AskAi.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import Query from './routes/Query.jsx'

const router = createHashRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Index />,
      },
      {
        path: 'account',
        element: <Account />,
      },
      {
        path: 'data',
        element: <Data />,
      },
      {
        path: 'ask-ai',
        element: <AskAi />,
      },
      {
        path: 'query',
        element: <Query />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
