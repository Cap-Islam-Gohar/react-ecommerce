import { CheckIcon, ClockIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom';
import { useCartQuery } from '../../Redux/Api/Service';
import RemoveFromCartBtn from '../Ui/RemoveFromCartBtn';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function Cart() {

    const {data:cart={}, error, isLoading, isError} = useCartQuery();

    const { total, products, quantity} = cart;

    return ( <>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
            <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

            <form className="mt-12">
                <section aria-labelledby="cart-heading">
                    <h2 id="cart-heading" className="sr-only">
                        Items in your shopping cart
                    </h2>

                    <ul role="list" className="divide-y divide-gray-200 border-b border-t border-gray-200">
                        {products?.map(({_id, count, price, product: {imageCover:image, title, id, quantity, inStock = (quantity !== 0)} }) => (
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

                                <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                    <div>
                                        <div className="flex justify-between">
                                            <h4 className="text-sm">
                                                <Link to={`/product/${id}`} className="font-medium text-gray-700 hover:text-gray-800">
                                                    {title}
                                                </Link>
                                            </h4>
                                            <p className="ml-4 text-sm font-medium text-gray-900">{price * count}<span className="text-sx">E£</span></p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">Quantity: {count} * {price}<span className="text-sm">E£</span></p>
                                    </div>

                                    <div className="mt-4 flex flex-1 items-end justify-between">
                                        <p className="flex items-center space-x-2 text-sm text-gray-700">
                                            {quantity ? (
                                                <CheckIcon className="h-5 w-5 flex-shrink-0 text-green-500" aria-hidden="true" />
                                            ) : (
                                                <ClockIcon className="h-5 w-5 flex-shrink-0 text-gray-300" aria-hidden="true" />
                                            )}

                                            <span className='block'>{inStock ? 'In stock' : `Will ship in three days`}</span>
                                        </p>
                                        <div className="ml-4 -mb-4">
                                            <RemoveFromCartBtn  id={id}  className="rounded-md font-medium text-red-500 bg-red-50 hover:bg-red-100">
                                                <XMarkIcon className='h-8 w-8' />
                                            </RemoveFromCartBtn>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>

                {/* Order summary */}
                <section aria-labelledby="summary-heading" className="mt-10">
                    <h2 id="summary-heading" className="sr-only">
                        Order summary
                    </h2>

                    <div>
                        <dl className="space-y-4">
                            <div className="flex items-center justify-between">
                                <dt className="text-base font-medium text-gray-900">Subtotal</dt>
                                <dd className="ml-4 text-base font-medium text-gray-900">{total}</dd>
                            </div>
                        </dl>
                        <p className="mt-1 text-sm text-gray-500">Shipping and taxes will be calculated at checkout.</p>
                    </div>

                    <div className="mt-10">
                        <button
                            type="submit"
                            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                        >
                            Checkout
                        </button>
                    </div>

                    <div className="mt-6 text-center text-sm">
                        <p>
                            or
                            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                            </a>
                        </p>
                    </div>
                </section>
            </form>
        </div>
    </>)
}
