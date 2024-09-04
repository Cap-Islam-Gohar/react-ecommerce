import { Link } from 'react-router-dom';
import Loader from '../Ui/Loader';
import { useCategoriesQuery } from '../../Redux/Api/Service';

export default function Categories() {


    const { data: categories,  error, isLoading, isError } = useCategoriesQuery();

    return (categories &&  <>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Categories <Loader when={isLoading} /></h2>
            <div className="mt-6 grid grid-cols-1 gap-8 px-8 sm:grid-cols-2 sm:px-6 md:grid-cols-3 md:gap-10 lg:grid-cols-4">
                {categories.map((category) => (
                    <div
                        key={`category-${category._id}`}
                        className="group relative aspect-h-5 h aspect-w-4 rounded-2xl sm:rounded-lg bg-white shadow-3xl border-1 border-gray-700 sm:aspect-h-7 sm:aspect-w-5 sm:h-auto"
                    >
                        <div>
                            <div aria-hidden="true" className="absolute inset-0 overflow-hidden rounded-2xl sm:rounded-lg">
                                <div className="absolute inset-0 overflow-hidden group-hover:opacity-75">
                                    <img
                                        src={category.image}
                                        alt={`category-${category.slug}`}
                                        className="h-full w-full object-cover object-center"
                                    />
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50" />
                            </div>
                            <div className="absolute inset-0 flex items-end rounded-lg p-6">
                                <div>
                                    <p aria-hidden="true" className="text-xl sm:text-sm text-white">
                                        Shop the category
                                    </p>
                                    <h3 className="mt-1 font-semibold text-white">
                                        <Link to={`/`}>
                                            <span className="absolute inset-0 rounded-2xl sm:rounded-lg shadow-3xl border-1 border-gray-700"></span>
                                            <span className='text-2xl sm:text-lg'>{category.name}</span>
                                        </Link>
                                    </h3>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>


        {/* <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
            
            <div className="sm:flex sm:items-baseline sm:justify-between">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
                <a href="#" className="hidden text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:block">
                    Browse all categories
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>

            <div className="flex flex-wrap gap-6 justify-center">

                {categories.data.map(({_id, slug, name, image}) => (
                    <Link
                        key={`/category-/${_id}`}
                        to={`/categories/${_id}`}
                        className="relative flex h-80 w-56 flex-col overflow-hidden rounded-lg p-6 hover:opacity-75 xl:w-auto"
                    >
                        <span aria-hidden="true" className="absolute inset-0">
                            <img src={image} alt={`image-${slug}`} className="h-full w-full object-cover object-center" />
                        </span>
                        <span
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-gray-800 opacity-50"
                        />
                        <span className="relative mt-auto text-center text-xl font-bold text-white">{name}</span>
                    </Link>
                ))}
            </div>
            <div className="mt-6 px-4 sm:hidden">
                <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                    Browse all categories
                    <span aria-hidden="true"> &rarr;</span>
                </a>
            </div>
        </div> */}

    </>)

}