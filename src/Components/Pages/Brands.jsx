import { Link } from 'react-router-dom';
import { useBrandsQuery } from '../../Redux/Api/Service';

export default function Brands() {

    const { data: brands,  error, isLoading, isError } = useBrandsQuery();

    return (brands && <>
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="relative mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3 sm:gap-x-10 lg:mx-0 lg:grid-cols-4">
                {brands.map(({_id, slug, name, image}) => (
                    <div key={`brand-${_id}`} className='aspect-h-1 aspect-w-1 flex flex-col items-center border-2 rounded-lg hover:opacity-75'>
                        <Link className='p-4'>
                            <div className=''>
                                <img className=" h-full w-full object-cover" alt={`image-${name}`} src={image} width="158" height="48" />
                            </div>
                            <p className='text-center font-semibold text-sm'>{name}</p>
                        </Link>
                    </div>
                ))}
            </div>
            <div className='mt-20 mx-auto max-w-fit py-1.5 font-medium ring-inset ring-offset-1 px-6 text-center text-gray-500 border rounded-full border-gray-300 bg-gray-100'>
                <span className='hidden text-sm md:inline-block'>Over then {brands.results} brands sells in our store </span>
                <Link className='text-sm font-semibold text-indigo-500 inline-block ml-2'>
                    See All Brands
                </Link>
                </div>
        </div>
    </>)

}
