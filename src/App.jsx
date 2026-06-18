import React from 'react';
import LayOut from './Component/LayOut/LayOut';
import Home from './Component/Home/Home';
import Favorites from './Component/Favorites/Favorites';
import Details from './Component/Details/Details';
import Login from './Component/Login/Login';
import Register from './Component/Register/Register';
import NotFound from './Component/NotFound/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HandelNavoarProvider from './Context/HandelNavpar';
import FavoritesProvider from './Context/FavoritesContext';
import ProtectedRout from './Component/ProtectedRout/ProtectedRout';

export default function App() {
  let routers = createBrowserRouter([
    {
      path: "/", element: <LayOut />, children: [
        { index: true, element: <ProtectedRout><Login /></ProtectedRout> },
        { path: 'home', element: <ProtectedRout><Home /></ProtectedRout> },
        { path: 'favorites', element: <ProtectedRout><Favorites /></ProtectedRout> },
        { path: 'details/:id', element: <ProtectedRout><Details /></ProtectedRout> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '*', element: <NotFound /> },
      ]
    }
  ]);

  return (
    <HandelNavoarProvider>
      <FavoritesProvider>
        <RouterProvider router={routers} />
      </FavoritesProvider>
    </HandelNavoarProvider>
  );
}