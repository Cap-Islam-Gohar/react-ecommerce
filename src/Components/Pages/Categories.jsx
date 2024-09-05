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
    </>)

}