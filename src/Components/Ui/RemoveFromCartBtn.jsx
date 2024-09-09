import Loader from "./Loader";
import { useRemoveFromCartMutation } from "../../Redux/Api/Service";
import { useNotify } from "../../Hooks/useNotify";
import { useEffect } from "react";
import { clsx } from '../../Helpers';


export default function RemoveFromCartBtn({ id, className, children }) {


    const [deleteFromCart, { isLoading, isSuccess, isError, error, data:response}] = useRemoveFromCartMutation(id);

    const notify = useNotify();
    
    useEffect( () => {
        isSuccess && notify.dispatch.success("Product successfull Removed from Cart.")
        console.log(response)
        isError && notify.dispatch.error("Error while Removing Product from Cart.")
        isLoading && notify.dispatch.loading('Removing Product...')
    })
    
    return (<>
        <button onClick={() => deleteFromCart(id) }
            type="button"  
            className={clsx(
                className,
                isLoading && 'transition ease-in-out duration-150 cursor-not-allowed'
            )}
            disabled={isLoading}
        > 
            { isLoading || children || 'Remove' }
            <Loader when={isLoading} rightTitle={'Processing...'} />
        </button>
    </>)
}