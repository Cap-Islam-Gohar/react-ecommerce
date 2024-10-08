import { useFormik } from "formik"
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeftEndOnRectangleIcon} from "@heroicons/react/24/solid";
import PhoneInput from "../Ui/PhoneInput";
import PasswordInput from "../Ui/PasswordInput";
import Input from "../Ui/Input";
import Alert from "../Ui/Alert";
import Loader from "../Ui/Loader";
import { useRegisterMutation } from "../../Redux/Api/Service";
import { useEffect, useState } from "react";
import { useNotify } from '../../Hooks/useNotify';
import { clsx, regex } from "../../Helpers";



export default function Register() {

    const [serverResponse, setServerResponse] = useState({
        state: '',
        message: '',
    });

    const navigate = useNavigate();
    const notify = useNotify();

    const [doRegister, { isLoading, isError, isSuccess, error, data:response}] = useRegisterMutation();
        
    useEffect(() => {
        isSuccess && notify.dispatch.success("welcome back to You Account")
        isError && notify.dispatch.error(error?.errors?.msg ?? error?.message ?? "Error When Sign In.")
        isLoading && notify.dispatch.loading('processing...')
    }, [isSuccess, isError, isLoading ])  

    /**
     * yup email validation function Yup.email() less strict , this function consider the email "user@example" as valid email.
     * Yup Owner said 
     *      "It's unlikely to make it into a release. 
     *      MY option generally for email validation is that we should make it less strict. 
     *      The only way to properly validate an email address is to send an email to it. 
     *      More robust regex approaches, always create false positives and false negatives".
     * So , I desided to make more strict manual email validation and not use Yup.email() function. 
     * also name need to regex to ensure that user didnt input empty string or string contains numbers.
     * ToDo: 
     * name regex .. Done
     */
    const form = useFormik({
        initialValues: { name: '', email: '', phone: '', password: '', rePassword: '' },
        validationSchema: Yup.object().shape({
            name: Yup.string().matches(regex.name, 'Invalid Name').min(5, 'Too Short!').max(50, 'Too Long!').required('Name Required'),
            email: Yup.string().matches(regex.email, 'Invalid Email Address').required('Email Required'),
            phone: Yup.string().matches(regex.phone, 'Invalid Phone Number').required('Mobile Number Required'),
            password: Yup.string().matches(regex.password, 'Password must contains at leatest one or more Charcter and one Number and one Symbol').min(6, 'Too Short!').required('Password Required'),
            rePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Password and Password Confirmation must match').required('Password Confirmation Required')
        }),
        onSubmit: async (values) => {
            try {
                await doRegister(values).unwrap();
                const x = setTimeout(() => {
                    navigate('/');
                    setServerResponse({ state: 'success', message: 'Welcome, Your will redirect to Dashboard .' });
                    clearTimeout(x);
                }, 1000);
            } catch (error) {
                console.log(error)
            }
        }
    });

    return (<>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex justify-center">
                    <ArrowLeftEndOnRectangleIcon className="w-20 h-20" />
                </div>
                <h2 className="mt-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    Sign Up to create new account
                </h2>
            </div>
      
            <div className="mt-2 sm:mx-auto sm:w-full sm:max-w-sm">
                { isError && <Alert when={isError} type={'error'}>
                    { error?.errors ? error.errors.msg : error.message }
                </Alert>}
                { isSuccess && <Alert when={isSuccess} type={'success'}>
                    Welcome, Your will redirect to Dashboard.
                </Alert>}
                <form onSubmit={form.handleSubmit} className="space-y-2">
                    <Input name="name" label="Name" form={form} placeholder="Your Name" required autoComplete="username" />                    
                    <Input type="email" name="email" label="Email Address" form={form} placeholder="username@emaple.com" required autoComplete="email" />
                    <PhoneInput name="phone" label="Mobile Number" form={form} placeholder="+20 (010) 123-456-78" required autoComplete="mobile" />
                    <PasswordInput type="password" label="Password" name="password" form={form} required placeholder="Password" id="password" autoComplete="password" />
                    <Input type="password" label="Password Confirmation" name="rePassword" form={form} required placeholder="Password Confirmation" id="password-confermation" autoComplete="new-password" />
                    <div className="pt-4">
                        <button type="submit" className={clsx(
                                'inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                                isLoading && 'transition ease-in-out duration-150 cursor-not-allowed'
                            )}
                            disabled={isLoading}
                        >
                            <Loader when={isLoading} rightTitle={'Processing...'} />
                            { !isLoading && 'Sign Up' }
                        </button>
                        
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    have accoun?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Sign In Now
                    </Link>
                </p>
            </div>
        </div>
    </>)
}