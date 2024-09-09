import LoaderIcon from "./LoaderIcon";
import { useAddToCartMutation } from "../../Redux/Api/Service";
import { useEffect } from 'react'
import { useNotify } from "../../Hooks/useNotify";
import { clsx } from "../../Helpers";

export default function AddToCartBtn({ id, className, children }) {


    const [addToCart, { isLoading, isError, isSuccess, error, data:response}] = useAddToCartMutation(id);

    const notify = useNotify();
    
    useEffect( () => {
        isSuccess && notify.dispatch.success(response.message)
        isError && notify.dispatch.error("Error when add Product to Cart")
        isLoading && notify.dispatch.loading('Adding Product...')
    })
    
    return (<>

        <button type="button" onClick={() => addToCart(id)} className={clsx(
            'disabled:cursor-not-allowed',
            className
        )} disabled={isLoading}>
            {children({isLoading})}
        </button>
    </>)
}