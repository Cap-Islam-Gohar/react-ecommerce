import Loader from './Loader';
import ProductsListSkelton from './ProductListSkelton';
import Alert from './Alert';
import ProductCard from './ProductCard';
import { useProductsQuery, useWishlistQuery } from '../../Redux/Api/Service';


export default function ProductsList() {


    const wishlist = useWishlistQuery();

    const { data: products, isSuccess, error, isLoading, isError } = useProductsQuery(); 
    
    function isInWishlist(product){
       return wishlist.isSuccess && wishlist.data.data.filter(wp => wp._id === product._id).length !== 0 ? false : true;
    }
    
    return (<>
        <div className='mt-6'>
            <Alert when={isError} type={'error'}>
                {error?.message}
            </Alert>
            <div className="sm:flex sm:items-baseline sm:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                    <span>Recent Products</span> 
                    <Loader className="inline-block ml-2 self-basline w-6 h-6" when={isLoading} />
                </h2>
                <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                    see all Products
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
            <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-4 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {products && products.map((product) => <ProductCard product={product} key={product.id} isInWishlist={ isInWishlist(product) } />)} 
                <ProductsListSkelton when={isLoading || isError } count={10} />
            </div>
            <div className="mt-6 sm:hidden">
                <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    Browse all Products
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </div>
    </>)
}