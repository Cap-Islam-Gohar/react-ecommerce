import Loader from "./Loader";
import { useRemoveFromCartMutation } from "../../Redux/Api/Service";
import { useNotify } from "../../Hooks/useNotify";
import { useEffect } from "react";
import { clsx } from '../../Helpers';


export default function RemoveFromCartBtn(props) {


    const [deleteFromCart, { isLoading, isSuccess, isError, error, data:response}] = useRemoveFromCartMutation(props.productId);

    const notify = useNotify();
    
    useEffect( () => {
        isSuccess && notify.dispatch.success(response.message)
        isError && notify.dispatch.error("Error while Removing Product from Cart")
        isLoading && notify.dispatch.loading('Removing Product...')
    })
    
    return (<>
        <button onClick={() => deleteFromCart(props.productId) }
            type="button"  
            className={clsx(
                props.className,
                isLoading && 'transition ease-in-out duration-150 cursor-not-allowed'
            )}
            disabled={isLoading}
        > 
            { isLoading || props.children || 'Remove' }
            <Loader when={isLoading} rightTitle={'Processing...'} />
        </button>
    </>)
}