import { useMemo } from 'react'
import { useSelector } from 'react-redux'

export function useAuth () {
    
    const {token, user} = useSelector(state => state.auth);

    const check = () => token ? true : false;

    return useMemo( () => ({token, user, check}), [token, user, check])

}
