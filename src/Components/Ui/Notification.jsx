
import { Fragment, useEffect } from 'react'
import { Transition } from '@headlessui/react'
import { FaceFrownIcon, FaceSmileIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { useDispatch, useSelector } from 'react-redux'
import { destroyNotify } from '../../Redux/Features/RootSlice'
import { CogIcon } from '@heroicons/react/24/solid'

export default function Notification(props) {

    const { show, data, time } = useSelector(state => state.root.notify);

    const dispatch = useDispatch();

    const iconMap = {
        success: <FaceSmileIcon className='h-6 w-6 text-green-400' aria-hidden="true"/>,
        error: <FaceFrownIcon className='h-6 w-6 text-red-400' aria-hidden="true"/>,
        loading: <CogIcon className='animate-spin h-6 w-6 text-gray-400'/>
    };
    
    const toastIcon = iconMap[data.type] || null;

    useEffect(() => {
        if(show){
            const x = setTimeout(() => {
                dispatch(destroyNotify())
                clearTimeout(x)
            }, data?.timeout || time );
        }
    }, [show])

    return (
        <>
            <div className="pointer-events-none fixed inset-0 flex justify-center items-end px-4 py-6 sm:p-6" >
                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                    <Transition
                        show={show}
                        as={Fragment}
                        enter="transform ease-out duration-300 transition"
                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="pointer-events-auto w-full max-w-md mx-auto overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="px-2 py-3">
                                <div className="flex items-start">
                                    {toastIcon && <div className="flex-shrink-0">
                                        { toastIcon }
                                    </div>}
                                    <div className="flex-1">
                                        <p className="text-xs sm:text-sm text-center font-medium text-gray-900">{ data.message }</p>
                                    </div>
                                    <div className="flex flex-shrink-0">
                                        <button
                                            type="button"
                                            className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                            onClick={() => dispatch(destroyNotify()) }
                                        >
                                            <span className="sr-only">Close</span>
                                            <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Transition>
                </div>
            </div>
        </>
    )
}
