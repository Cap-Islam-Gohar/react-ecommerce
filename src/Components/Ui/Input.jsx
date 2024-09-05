import { ExclamationCircleIcon, CheckCircleIcon } from "@heroicons/react/24/solid";
import React from "react";
import { clsx } from "../../Helpers";


export default function Input(props) {

    const { float, name, type, id, value, label, onBlur, onChange, required, placeholder, autoComplete, errorMsg, whenTouched, form} = props;

    const formErrorMsg = form.errors[name];
    const fromInputTouched = form.touched[name];
    
    const input = {
        name: name,
        type: type ?? 'text',
        id: id ?? name,
        label: label ?? name,
        value: value ?? form.values[name],
        onBlur: onBlur ?? form.handleBlur,
        onChange: onChange ?? form.handleChange,
        required: required,
        placeholder: placeholder ?? name,
        autoComplete: autoComplete,
        errorMsg: errorMsg ?? formErrorMsg,
        whenTouched: whenTouched ?? fromInputTouched,
        displayErrorMsg: () => {
            return input.whenTouched && input.errorMsg;
        },
        hasError: () => {
            return input.whenTouched && input.errorMsg;
        },
        hasSuccess: () => {
            return input.value && !input.errorMsg;
        },
        getStateClasses: () => {
            if(input.hasError()){
                return input.hasError() && "text-red-500 ring-red-300 focus:ring-red-500 placeholder:text-red-400";
            }else if(input.hasSuccess()){
                return input.hasSuccess() && "text-emerald-900 ring-emerald-300 focus:ring-emerald-500 placeholder:text-emerald-400";
            }
            return "text-gray-900 ring-gray-300 focus:ring-gray-500 placeholder:text-gray-400";
        }
    }    
        
    return (<>
        <div className={props.className}>
            <label htmlFor={input.id ?? input.name} className="block text-sm font-medium leading-6 text-gray-900">
                {input.label}
            </label>
            <div className="relative">
                {float === "left" && props.children }
                <input
                    type={input.type}
                    id={input.id}
                    name={input.name}
                    value={input.value}
                    onBlur={input.onBlur}
                    onChange={input.onChange}
                    required={input.required}
                    placeholder={input.placeholder}
                    autoComplete={input.autoComplete}
                    className={clsx(
                        "block w-full border-0 rounded-md py-1.5 ring-1 ring-inset focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6",
                        props.padding,
                        input.getStateClasses(),
                    )} />
                <div className="absolute right-0 inset-y-0 flex items-center px-1.5">
                    {float === "right" && props?.floatRight(input) }
                    {input.hasError() && <ExclamationCircleIcon className="h-5 w-5 text-red-500" />}
                    {input.hasSuccess() && <CheckCircleIcon className="h-5 w-5 text-emerald-500" />}
                </div>
            </div>
            <div className="text-sm text-red-500">
                {input.displayErrorMsg()}
            </div>
        </div>
    </>)
}