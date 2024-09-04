import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export const useAuth = () => {
    
    const {token, user:{name='', email, role}} = useSelector(state => state.auth);

    const check = () => token ? true : false;

    return useMemo( () => ({token, name, email, role, check}), [token, name, email, role, check])

}
