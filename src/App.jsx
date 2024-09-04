import './App.css';
import Layout from './Components/Layout'
import Guard from './Components/Guard'
import NotFound from './Components/NotFound'
import Register from './Components/Auth/Login'
import Login from './Components/Auth/Login'
import Home from './Components/Pages/Home'
import Product from './Components/Pages/Product'
import Cart from './Components/Pages/Cart'
import Categories from './Components/Pages/Categories'
import Brands from './Components/Pages/Brands'
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Wishlist from './Components/Pages/Wishlist';
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';


export default function App() {

	const router = createBrowserRouter(
        [{ 
            path: '', 
            element: <Layout />, 
            errorElement: <NotFound/>,
            children: [
                { path : '', index: true, element: <Guard><Home /></Guard>  },
                { path: 'register', element: <Register /> },
                { path: 'login', element: <Login /> },
                { path: 'product/:id', element: <Guard><Product/></Guard> },
                { path: 'cart', element: <Guard><Cart/></Guard> },
                { path: 'wishlist', element: <Guard><Wishlist/></Guard> },
                { path: 'categories', element: <Guard><Categories/></Guard> },
                { path: 'brands', element: <Guard><Brands/></Guard> }
            ]
        }] ,{
            basename: "/"
        });


	return <Provider store={Store}>
        {/* <BrowserRouter>
            <Routes>
                <Route path="/" element={<Guard><Home /></Guard>} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/card" element={<Guard><Card /></Guard>} />
                <Route path="/brands" element={<Guard><Brands /></Guard>} />
                <Route path="/categories" element={<Guard><Categories /></Guard>} />
                <Route path="/wishlist" element={<Guard><Wishlist /></Guard>} />
            </Routes>
        </BrowserRouter> */}
        <RouterProvider router={router} />
	</Provider>
}