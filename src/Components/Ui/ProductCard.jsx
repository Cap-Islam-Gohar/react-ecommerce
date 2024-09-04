import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";
import AddToWishlistBtn from "./AddToWishlistBtn";
import RemoveFromWishlistBtn from "./RemoveFromWishlistBtn";
import { HeartIcon as OutlineHeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/react/24/solid";

export default function ProductCard(props) {

    let product = props.product;    

    const [show, setShow] = useState(false);

    useEffect(() => {
        let showProduct = setTimeout(() => {
            setShow(true);
        }, 150);

        return () => {
            clearTimeout(showProduct)
        }
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
            <div className="relative mt-4">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{product.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{product.category.name}</p>
                </div>
            <div className="mt-2 flex justify-between space-x-2 relative w-full transition-all duration-1000 opacity-0 group-hover:opacity-100 translate-y-full group-hover:translate-y-0">
                <AddToCartBtn productId={product.id} className="flex flex-1 items-center justify-center rounded-md border border-transparent bg-emerald-600 px-8 py-2 text-sm font-medium text-emerald-100 hover:bg-emerald-500">
                    Add to Cart
                </AddToCartBtn>
                {props.isInWishlist && <AddToWishlistBtn productId={product.id} 
                    className="items-center justify-center rounded-md px-1 py-1 text-xs sm:px-3 sm:py-3 text-red-400 hover:bg-red-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50">
                    <OutlineHeartIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                </AddToWishlistBtn>}
                {!props.isInWishlist && <RemoveFromWishlistBtn productId={product.id} 
                    className="items-center justify-center rounded-md px-1 py-1 text-xs sm:px-3 sm:py-3 text-red-400 hover:bg-red-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50">
                    <SolidHeartIcon className="h-6 w-6 cursor-pointer" aria-hidden="true" />
                    <span className="sr-only">Add to favorites</span>
                </RemoveFromWishlistBtn>}
                
            </div>
        </div>
    </>)
}