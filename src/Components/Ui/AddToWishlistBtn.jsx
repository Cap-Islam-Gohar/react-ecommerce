import Loader from './Loader'
import { useAddToWishlistMutation } from '../../Redux/Api/Service';
import { useEffect } from 'react';
import { useNotify } from '../../Hooks/useNotify';
import { clsx } from '../../Helpers';

export default function AddToWishlistBtn(props) {
    
    

    const [addToWishlist, { isLoading, isError, isSuccess, error, data:response}] = useAddToWishlistMutation(props.productId);

    const notify = useNotify();
    
    useEffect( () => {
        isSuccess && notify.dispatch.success(response.message)
        isError && notify.dispatch.error("Error when add Product to Wishlist")
        isLoading && notify.dispatch.loading('Adding Product...')
    })

    return (<>
        <button onClick={() => addToWishlist(props.productId) }
            type="button"  
            className={clsx(
                props.className,
                isLoading && 'transition ease-in-out duration-150 cursor-not-allowed'
            )}
            disabled={isLoading}
        > 
            { isLoading || props.children }
            <Loader when={isLoading} />
        </button>
    </>)
}