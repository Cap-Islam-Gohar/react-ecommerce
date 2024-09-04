import { Link, NavLink } from "react-router-dom";
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/24/outline'
import { ArrowRightStartOnRectangleIcon, BuildingStorefrontIcon } from "@heroicons/react/24/solid";
import Logout from "../Auth/Logout";
import { useAuth } from '../../Hooks/useAuth';
import { useCartQuery } from "../../Redux/Api/Service";
import { useSelector } from "react-redux";

export default function Navbar() {

    // const auth = useAuth();
    const { token } = useSelector(state => state.auth);

    const {data :cart = {}, error, isLoading, isError} = useCartQuery();

    const { quantity } =  cart;

    return (<>
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="border-b border-gray-200">
                <div className="h-16 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <button type="button" className="relative rounded-md bg-white p-2 text-gray-400 lg:hidden">
                            <span className="absolute -inset-0.5"></span>
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>
                        <div className="">
                            <Link to="">
                                <span className="sr-only">Company Name</span>
                                <BuildingStorefrontIcon className="h-8 w-auto text-pink-600" ></BuildingStorefrontIcon>
                            </Link>
                        </div>
                        <div className="hidden lg:block">
                            <div className="flex h-full ml-10 space-x-4">
                                {[
                                    ['Home', ''],
                                    ['Categories', '/categories'],
                                    ['Brands', '/brands'],
                                    ['Wishlist', '/Wishlist'],
                                ].map(([title, url], i) => (
                                    <NavLink
                                        to={url}
                                        key={i}
                                        className={({ isActive }) => [
                                                "rounded-lg px-3 py-2 font-medium",
                                                isActive ? "text-slate-100 bg-slate-900" : "text-slate-700 hover:bg-slate-100 hover:text-slate-900",
                                            ].join(" ")
                                        }>
                                        {title}
                                    </NavLink>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                            {token ? <>
                                <Logout className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                    Sign Out
                                    <ArrowRightStartOnRectangleIcon className="h-6 w-6 ml-1" />        
                                </Logout>
                            </> : <><Link to="login" className="text-sm font-medium text-gray-700 hover:text-gray-800">Sign in</Link>
                                <span className="h-6 w-px bg-gray-200" aria-hidden="true"></span>
                                <Link to="register" className="text-sm font-medium text-gray-700 hover:text-gray-800">Create account</Link>
                            </>}
                        </div>

                        {token && <> 
                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            </div>                            

                            <div className="ml-4 flow-root lg:ml-6">
                                <Link to={'/cart'} href="#" className="group -m-2 flex items-center p-2">
                                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                                        { quantity }
                                    </span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </Link>
                            </div>
                        </>}

                    </div>
                </div>
            </div>
        </nav>
    </>)
}