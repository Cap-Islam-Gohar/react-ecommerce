import { Link, useParams } from "react-router-dom"
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import { HeartIcon } from '@heroicons/react/24/outline'
import AddToCartBtn from "../Ui/AddToCartBtn";
import AddToWishlistBtn from "../Ui/AddToWishlistBtn";
import { useProductQuery } from "../../Redux/Api/Service";
import { clsx } from '../../Helpers';
export default function Product() {

    const params = useParams();

    const {data :product, error, isLoading, isError} = useProductQuery(params.id);


    return ( product && <>
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
                <TabGroup as="div" className="flex flex-col-reverse">
                    <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                        <TabList className="grid grid-cols-4 gap-6">
                            {product.images.map((image, index) => (
                                <Tab
                                    key={`thumnail-image-${index}`}
                                    className="relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                                >
                                    {({ selected }) => (
                                        <>
                                            <span className="sr-only">{image}</span>
                                            <div className="absolute inset-0 overflow-hidden rounded-md">
                                                <img src={image} alt={`thumnail-image-${index}-${product.slug}`} className="h-full w-full scale-110 object-cover object-center" />
                                            </div>
                                            <span
                                                className={clsx(
                                                    'pointer-events-none absolute inset-0 rounded-md ring-2 ring-offset-2',
                                                    selected ? 'ring-indigo-500' : 'ring-transparent'
                                                )}
                                                aria-hidden="true"
                                            />
                                        </>
                                    )}
                                </Tab>
                            ))}
                        </TabList>
                    </div>

                    <TabPanels className="aspect-h-1 aspect-w-1 w-full">
                        {product.images.map((image, index) => (
                            <TabPanel key={`image-${index}`}>
                                <div className="absolute inset-0 overflow-hidden rounded-md">
                                    <img
                                        src={`${image}`}
                                        alt={`image-${index}-${product.slug}`}
                                        className="h-full w-full rounded-md scale-110 object-cover object-center sm:rounded-lg"
                                    />
                                </div>
                            </TabPanel>
                        ))}
                    </TabPanels>
                </TabGroup>

                <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{product.title}</h1>

                    <div className="mt-3">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">{product.price}<span className="inline-block text-sm font-medium">E£</span></p>
                    </div>

                    <div className="mt-3">
                        <h3 className="sr-only">Reviews</h3>
                        <div className="flex items-center">
                            <div className="flex items-center">
                                {[0, 1, 2, 3, 4].map((rating) => (
                                    <StarIcon
                                        key={rating}
                                        className={clsx(
                                            'h-5 w-5 flex-shrink-0',
                                            product.ratingsAverage > rating ? 'text-yellow-500' : 'text-gray-300',
                                        )}
                                        aria-hidden="true"
                                    />
                                ))}
                            </div>
                            <p className="sr-only">{product.ratingsAverage} out of 5 stars</p>
                        </div>
                    </div>

                    <div className="mt-4">
                        <h3 className="sr-only">Description</h3>

                        <div className="space-y-6 text-base text-gray-700">{ product.description }</div>
                        <Link to="/" className="space-y-6 text-base text-gray-700">{ product.category.name }</Link>
                        <Link to="/" className="space-y-6 text-base text-gray-700">{ product.brand.name }</Link>
                    </div>

                    <div className="sm:flex-col1 mt-10 flex">

                        <AddToCartBtn productId={product.id} 
                            className="flex max-w-xs flex-1 items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 sm:w-full"
                        />
                        
                        <AddToWishlistBtn productId={product.id} 
                            className="ml-4 flex items-center justify-center rounded-md px-3 py-3 text-gray-400 hover:bg-gray-100 hover:text-gray-500">
                            <HeartIcon className="h-6 w-6 flex-shrink-0" aria-hidden="true" />
                            <span className="sr-only">Add to favorites</span>
                        </AddToWishlistBtn>

                    </div>

                </div>
                
            </div>
        </div>
    </>)
}