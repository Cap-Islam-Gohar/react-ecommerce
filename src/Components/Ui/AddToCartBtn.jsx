import Loader from "./Loader";
import { useAddToCartMutation } from "../../Redux/Api/Service";
import { useEffect } from 'react'
import { useNotify } from "../../Hooks/useNotify";

export default function AddToCartBtn(props) {


    const [addToCart, { isLoading, isError, isSuccess, error, data:response}] = useAddToCartMutation(props.productId);

    const notify = useNotify();
    
    useEffect( () => {
        isSuccess && notify.dispatch.success(response.message)
        isError && notify.dispatch.error("Error when add Product to Cart")
        isLoading && notify.dispatch.loading('Adding Product...')
    })
    
    return (<>
        <button type="button" onClick={() => addToCart(props.productId)} className={props.className}>
            { isLoading || props.children || 'Add To Cart' }
            <Loader when={isLoading} rightTitle={'Processing...'} />
        </button>
    </>)
}