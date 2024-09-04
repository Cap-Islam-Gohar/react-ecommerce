import { CheckCircleIcon, ExclamationCircleIcon, XMarkIcon } from "@heroicons/react/24/solid";

export default function Alert(props){

    // types are 'error'| ''success
    const {type, message, when, onClose} = props;

    return (Boolean(when) && <> 
        <div className="w-full my-3">
            <div className={['p-4 rounded-md', type === 'success' && 'bg-green-50', type === 'error' && 'bg-red-50'].join(" ") }>
                <div className="flex">
                    <div className="flex-shrink-0">
                        { type === 'success' && <CheckCircleIcon className="w-5 h-5 text-green-400" /> }
                        { type === 'error' && <ExclamationCircleIcon className="w-5 h-5 text-red-400" /> }
                    </div>
                    <div className="ml-3">
                        <p className={['font-medium text-sm', type === 'success' && 'text-green-800', type === 'error' && 'text-red-800', ].join(" ") }>
                            {message ?? props.children}
                        </p>
                    </div>
                    {onClose && <div className="pl-3 ml-auto">
                        <div className="-m-1.5">
                            <button type="button" onClick={onClose}
                                className={[
                                    'inline-flex p-1.5 rounded-md focus:ring-2 focus:ring-offset-2 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-transparent',
                                    type === 'success' && 'hover:bg-green-200 text-green-500 bg-green-50 focus:ring-offset-green-50 focus:ring-green-600',
                                    type === 'error' && 'hover:bg-red-200 text-red-500 bg-red-50 focus:ring-offset-red-50 focus:ring-red-600',
                                ].join(" ")
                            }>
                                <span className="absolute w-[1px] h-[1px] p-0 -m-[1px] overflow-hidden border-0 whitespace-nowrap">Dismiss</span>
                                <XMarkIcon className={['w-5 h-5', type === 'success' && 'text-green-800', type === 'error' && 'text-red-800', ].join(" ") }></XMarkIcon>
                            </button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    </>)
}