import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";
import RemoveFromWishlistBtn from "./RemoveFromWishlistBtn";
import { HeartIcon } from "@heroicons/react/24/solid";
import LoaderIcon from "./LoaderIcon";

export default function ProductCard({ product, isInWishlist }) {

    const [show, setShow] = useState(false);

    useEffect(() => {
        let showProduct = setTimeout(() => {
            setShow(true);
            clearTimeout(showProduct)
        }, 500);
    });
    

    return (<>
        <div className={"group transition-all duration-1000"} style={{opacity: show ? 1 : 0}}>
            <Link to={`/product/${product.id}`} key={product.id} className="relative">
                <div className={"relative transition-all duration-1000 delay-s-1 h-96 w-full overflow-hidden rounded-lg group-hover:opacity-75"} style={{opacity: show ? 1 : 0}}>
                    <img src={product.imageCover} alt={product.slug} style={{opacity: show ? 1 : 0}}
                        className={"h-full w-full scale-110 transition-all duration-1000 delay-s-2 object-cover object-center"} />
                </div>
                <div className="absolute inset-x-0 top-0 flex h-96 items-end justify-end overflow-hidden rounded-lg p-4 border border-gray-100 shadow-md" >
                    <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-black opacity-50" aria-hidden="true"/>
                    <p className="relative text-lg font-semibold text-white">{product.price}<span className="text-sm">E£</span></p>
                </div>
            </Link>
            <div className="relative mt-1">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                </div>
            <div className="mt-1 h-10 w-full flex justify-between space-x-2 relative transition-all duration-1000 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
                <AddToCartBtn id={product.id} className={"flex w-full h-10 items-center justify-center rounded-md border border-transparent bg-emerald-600 text-sm font-medium text-emerald-100 hover:bg-emerald-500"}>
                    {({isLoading}) => {
                        return (<>
                            {!isLoading && "Add To Cart"}
                            {isLoading && (<>
                                <LoaderIcon className={"inline-block w-6 h-6 mr-2"}     />
                                {"Adding..."}
                            </>)} 
                        </>)
                    }}                              
                </AddToCartBtn>

                
                {isInWishlist && <AddToWishlistBtn id={product.id} 
                    className="flex w-10 p-1 justify-center items-center rounded-md text-xs bg-slate-100 text-slate-400 hover:bg-slate-200 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 focus:ring-offset-slate-50">
                    <HeartIcon className="w-full h-full cursor-pointer" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                </AddToWishlistBtn>}
                {!isInWishlist && <RemoveFromWishlistBtn id={product.id} 
                    className="flex w-10 p-1 justify-center items-center rounded-md text-xs text-red-400 hover:bg-red-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50">
                    <HeartIcon className="w-full h-full  cursor-pointer" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                </RemoveFromWishlistBtn>}
                
            </div>
        </div>
    </>)
}