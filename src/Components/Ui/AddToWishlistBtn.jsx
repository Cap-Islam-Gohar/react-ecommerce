import Loader from './Loader'
import { useAddToWishlistMutation } from '../../Redux/Api/Service';
import { useEffect } from 'react';
import { useNotify } from '../../Hooks/useNotify';
import { clsx } from '../../Helpers';

export default function AddToWishlistBtn({ id, className, children }) {
    
    

    const [addToWishlist, { isLoading, isError, isSuccess, error, data:response}] = useAddToWishlistMutation(id);

    const notify = useNotify();
    
    useEffect( () => {
        isSuccess && notify.dispatch.success(response.message)
        isError && notify.dispatch.error("Error when add Product to Wishlist")
        isLoading && notify.dispatch.loading('Adding Product...')
    })

    return (<>
        <button onClick={() => addToWishlist(id) }
            type="button"  
            className={clsx(
                className,
                isLoading && 'transition ease-in-out duration-150 cursor-not-allowed'
            )}
            disabled={isLoading}
        > 
            { isLoading || children }
            <Loader when={isLoading} />
        </button>
    </>)
}