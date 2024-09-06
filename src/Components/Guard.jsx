import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useAuth } from  '../Hooks/useAuth'

export default function Guard (props){

    const auth = useAuth();

    return auth.check() ? props.children : <Navigate to="/login" />;
 
}