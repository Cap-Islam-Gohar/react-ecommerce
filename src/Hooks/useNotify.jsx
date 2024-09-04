import { useDispatch } from 'react-redux'
import { notify } from '../Redux/Features/RootSlice';
import { useMemo } from 'react';

export const useNotify = (value = {}) => {

    const dispatch = useDispatch();
    const dispatcher = (type,message) =>  ({action: dispatch(notify({type:type, message}))});
    return useMemo(() => ({ dispatch: ({
        success: (message) => dispatcher('success', message),
        error: (message) =>  dispatcher('error', message),
        loading: (message) =>  dispatcher('loading', message),
    }) }), [dispatch, notify, value])

}
