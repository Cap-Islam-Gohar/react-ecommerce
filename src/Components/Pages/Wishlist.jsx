import { Link } from 'react-router-dom';
import { useWishlistQuery } from '../../Redux/Api/Service';
import RemoveFromWishlistBtn from '../Ui/RemoveFromWishlistBtn';
import AddToCartBtn from '../Ui/AddToCartBtn';
import { XMarkIcon } from '@heroicons/react/24/solid';
import LoaderIcon from '../Ui/LoaderIcon';

export default function Wishlist() {

    const {data:wishlist={}, error, isLoading, isError} = useWishlistQuery();

    const { count, data:products} = wishlist;

    return ( <>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Wishlist</h1>

            <form className="mt-12">
                <section aria-labelledby="cart-heading">
                    <h2 id="cart-heading" className="sr-only">
                        Items in your Wishlist
                    </h2>

                    <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                        {console.log(products)}
                        {products?.map(({_id:id, price, imageCover:image, title} ) => (
                            <li key={`wishlist-${id}`} className={'py-6 flex'}>
                                <div className="flex-shrink-0">
                                    <div className='relative overflow-hidden bg-gray-400 rounded-md h-24 w-24 sm:h-32 sm:w-32 transition-all duration-1000 delay-s-2'>
                                        <img
                                            src={image}
                                            alt={`image-${title}`}
                                            className="w-full h-full scale-110 transition-all duration-1000 delay-s-2 object-cover object-center"
                                        />
                                    </div>
                                </div>

                                <div className="w-full ml-2 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div className="flex flex-1 justify-between">
                                        <h4 className="text-sm sm:text-base">
                                            <Link to={`/product/${id}`} className="sm:font-medium text-gray-700 hover:text-gray-800">
                                                {title}
                                            </Link>
                                        </h4>
                                        <p className="ml-4 text-sm font-medium text-gray-900">{price}<span className="text-sx">E£</span></p>
                                    </div>

                                    <div className='flex flex-1 justify-end items-end'>
                                        <div className='flex space-x-2'>
                                            <AddToCartBtn id={id} className="px-3 h-6 sm:h-8 rounded-md border border-transparent bg-indigo-50 text-xs sm:text-base font-medium text-indigo-800 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50">
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
                                            <RemoveFromWishlistBtn  id={id} 
                                                className="h-6 w-6 sm:h-8 sm:w-8 rounded-md text-red-400 bg-red-100 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50">
                                                <XMarkIcon className="block w-full h-full cursor-pointer" aria-hidden="true" />
                                                <span className="sr-only">Remove from favorites</span>
                                            </RemoveFromWishlistBtn>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

            
            </form>
        </div>
    </>)
}
