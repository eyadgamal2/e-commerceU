import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './page/Home';
import Layout from './page/Layout';
import Products from './page/Products';
import Cart from './page/Cart';
import NotFound from './page/NotFound.jsx';
import WishList from './page/WishList';
import Catgories from './page/Categories.jsx';
import Login from './page/Login';
import Register from './page/Register';
import Brands from './page/Brands.jsx';
import "@fortawesome/fontawesome-free/css/all.min.css"
import { Toaster } from "react-hot-toast";
import AuthContextProvider from "./Context/AuthContext"
import { QueryClient, QueryClientProvider } from "react-query";
import ProductDetails from "./page/ProductDetails.jsx";
import CartContextProvider from './Context/CartContext';
import Payment from './page/Payment';
import ProtectedRoute from "./compontents/ProtectedRoute.jsx";
import AuthProtected from "./compontents/AuthProtected.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ForgetPassword from './page/ForgetPassword.jsx';
import VerifyCode from './compontents/VerifyCode.jsx';
import ResetPassowrd from './compontents/ResetPassowrd';

export default function App() {
  const x = new QueryClient()

  const router = createBrowserRouter([
    {
      path: "/",
      element: <AuthContextProvider>
        <CartContextProvider>
          <Layout />
          </CartContextProvider>
      </AuthContextProvider>,
      children: [
        { path: "home", element: <ProtectedRoute><Home /></ProtectedRoute> },
        { path: "brands", element: <ProtectedRoute><Brands /></ProtectedRoute> },
        { path: "products", element: <ProtectedRoute><Products /></ProtectedRoute> },
        { path: "cart", element: <ProtectedRoute><Cart /></ProtectedRoute> },
        { path: "wishlist", element: <ProtectedRoute><WishList /></ProtectedRoute> },
        { path: "catgories", element: <ProtectedRoute><Catgories /></ProtectedRoute> },
        { path: "login", element: <AuthProtected><Login /></AuthProtected> },
        { path: "verifycode", element: <AuthProtected><VerifyCode /></AuthProtected> },
        { path: "forgetpassword", element: <AuthProtected><ForgetPassword /></AuthProtected> },
        { path: "resetpassword", element: <AuthProtected><ResetPassowrd /></AuthProtected> },
        { path: "register", element: <AuthProtected><Register /></AuthProtected> },
        { path: 'products/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
        { path: 'payment', element: <ProtectedRoute><Payment /></ProtectedRoute> },
        { path: "*", element: <NotFound /> },
      ]
    }
  ]);

  return (
    <QueryClientProvider client={x}>
      <AuthContextProvider>
        <CartContextProvider>
          <Toaster />
          <RouterProvider router={router} />
        </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
};
