import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import Input from "./Input";
import { clsx } from '../../Helpers';

export default function PasswordInput(props) {

    const [inputType, setInputType] = useState(props.type);

    function togglePassType() {
        if(inputType === 'password'){
            setInputType('text');
        }else if(inputType === 'text'){
            setInputType('password');
        }       
    }    

    return (<>
        <Input 
            {...props} 
            type={inputType}
            float="right" 
            floatRight={({hasError, hasSuccess, type}) => 
                <div onClick={togglePassType}>
                    {type === 'text' ? <EyeSlashIcon className={clsx(
                        'h-5 w-5 text-gray-900', 
                        hasError('password') && 'text-red-500', 
                        hasSuccess('password') && 'text-emerald-500' 
                    )} /> : <EyeIcon className={clsx(
                        'h-5 w-5 text-gray-900', 
                        hasError('password') && 'text-red-500',
                        hasSuccess('password') && 'text-emerald-500' 
                    )} />}
                </div>
            }
        >
            {props.children}
            
        </Input>
    </>)
}