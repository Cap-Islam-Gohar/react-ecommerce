import Loader from './Loader'
import { useRemoveFromWishlistMutation } from '../../Redux/Api/Service';
import { useNotify } from '../../Hooks/useNotify';
import { useEffect } from 'react';
import { clsx } from '../../Helpers';

export default function RemoveFromWishlistBtn({id, className, children}) {

    const [deleteFromWishlist, { isLoading, isSuccess, isError, error, data:response}] = useRemoveFromWishlistMutation(id);

    const notify = useNotify();
    
    useEffect( () => {
        isSuccess && notify.dispatch.success(response.message)
        isError && notify.dispatch.error("Error while Removing Product from Wishlist")
        isLoading && notify.dispatch.loading('Removing Product...')
    })
    
    return (<>
        <button onClick={() => deleteFromWishlist(id) }
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