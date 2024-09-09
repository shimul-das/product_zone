import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './Components/Layout/Home';
import Login from './Components/Login/Login';
import AuthProvider from './Components/Providers/AuthProvider';
import PrivateRoute from './routes/PrivateRoute';
import Error404 from './Components/Error404/Error404';
import Main from './Components/Main/Main';
import AddProduct from './Components/Add Product/AddProduct';
import ManageProducts from './Components/All Product/ManageProducts';
import UpdateProduct from './Components/Update/UpdateProduct';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    children:[
      {
        path:'/',
        element:<Main></Main>,
      },
      {
        path:'/login',
        element:<Login></Login>
      },
      {
        path: '/add-product',
        element: <PrivateRoute><AddProduct /></PrivateRoute>, // Protect this route
      },
      {
        path: '/all-products',
        element: <PrivateRoute><ManageProducts /></PrivateRoute>,
      },
      {
        path: '/update/:id',
        element: <PrivateRoute><UpdateProduct /></PrivateRoute>,
      },      
      {
        path:'/*',
        element:<Error404></Error404>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
