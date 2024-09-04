import { Link } from 'react-router-dom';
import { useWishlistQuery } from '../../Redux/Api/Service';
import RemoveFromWishlistBtn from '../Ui/RemoveFromWishlistBtn';
import AddToCartBtn from '../Ui/AddToCartBtn';
import { HeartIcon } from '@heroicons/react/24/solid';

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
                        {products?.map(({_id, price, imageCover:image, title, id, quantity} ) => (
                            <li key={`cart-${_id}`} className={'py-6 flex'}>
                                <div className="flex-shrink-0">
                                    <div className='relative overflow-hidden bg-gray-400 rounded-md h-24 w-24 sm:h-32 sm:w-32 transition-all duration-1000 delay-s-2'>
                                        <img
                                            src={image}
                                            alt={`image-${title}`}
                                            className="w-full h-full scale-110 transition-all duration-1000 delay-s-2 object-cover object-center"
                                        />
                                    </div>
                                </div>

                                <div className="ml-2 flex flex-1 flex-col justify-between sm:ml-6">
                                    <div className="flex justify-between">
                                        <h4 className="text-sm sm:text-base">
                                            <Link to={`/product/${id}`} className="sm:font-medium text-gray-700 hover:text-gray-800">
                                                {title}
                                            </Link>
                                        </h4>
                                        <p className="ml-4 text-sm font-medium text-gray-900">{price}<span className="text-sx">E£</span></p>
                                    </div>

                                    <div className="flex sm:flex-1 items-end justify-end space-x-2">
                                        <AddToCartBtn productId={id} 
                                            className="rounded-md border border-transparent bg-indigo-50 px-3 py-2 text-xs sm:px-8 sm:py-3.5 sm:text-base font-medium text-indigo-800 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                        />
                                        <RemoveFromWishlistBtn  productId={id} 
                                            className="items-center justify-center rounded-md px-1 py-1 text-xs sm:px-3 sm:py-3 text-red-400 hover:bg-red-100 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-50">
                                            <HeartIcon className="sm:h-8 sm:w-8 cursor-pointer" aria-hidden="true" />
                                            <span className="sr-only">Add to favorites</span>
                                        </RemoveFromWishlistBtn>
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
