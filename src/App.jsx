import './App.css';
import Layout from './Components/Layout'
import Guard from './Components/Guard'
import NotFound from './Components/NotFound'
import Register from './Components/Auth/Register'
import Login from './Components/Auth/Login'
import Home from './Components/Pages/Home'
import Product from './Components/Pages/Product'
import Cart from './Components/Pages/Cart'
import Categories from './Components/Pages/Categories'
import Brands from './Components/Pages/Brands'
import { Provider } from 'react-redux';
import Store from './Redux/Store';
import Wishlist from './Components/Pages/Wishlist';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


export default function App() {

	return <Provider store={Store}>
        <BrowserRouter>
            <Routes>
                <Route path="" element={<Layout />}>
                    <Route path="" element={<Guard><Home /></Guard>} />
                    <Route path="login" element={<Login />} />
                    <Route path="register" element={<Register />} />
                    <Route path="product/:id" element={<Guard><Product /></Guard>} />
                    <Route path="brands" element={<Guard><Brands /></Guard>} />
                    <Route path="categories" element={<Guard><Categories /></Guard>} />
                    <Route path="cart" element={<Guard><Cart /></Guard>} />
                    <Route path="wishlist" element={<Guard><Wishlist /></Guard>} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
	</Provider>
}