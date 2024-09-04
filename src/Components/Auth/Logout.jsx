import { useDispatch } from "react-redux";
import { doLogout } from "../../Redux/Features/AuthSlice";

export default function Logout (props) {

    const dispatch = useDispatch();   

    return (<>
        <a href="" onClick={() => {dispatch(doLogout())}} className={props?.className}>{props.children}</a>
    </>)
}