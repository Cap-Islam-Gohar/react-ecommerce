import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from '../Hooks/useAuth'

export default function Guard (props){

    // const auth = useAuth();
    const auth = useSelector(state => state.auth)

    return auth.token ? props.children : <Navigate to="login" />;
 
}