import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Input from "../Ui/Input";
import Loader from "../Ui/Loader";
import Alert from "../Ui/Alert";
import PasswordInput from "../Ui/PasswordInput";
import { useLoginMutation } from "../../Redux/Api/Service";
import { useEffect } from "react";
import { useNotify } from "../../Hooks/useNotify";
import { clsx, regex } from "../../Helpers";

export default function Login() {

    const navigate = useNavigate();
    const notify = useNotify();
    const [doLogin, { isLoading, isError, isSuccess, error, data: response }] = useLoginMutation();

    useEffect(() => {
        isSuccess && notify.dispatch.success("welcome back to You Account")
        isError && notify.dispatch.error(error?.errors?.msg ?? error?.message ?? "Error When Sign In.")
        isLoading && notify.dispatch.loading('processing...')
    }, [isSuccess, isError, isLoading]);

    // We Dont need password validation on login page since security considers.
    const form = useFormik({
        initialValues: { email: '', password: '' },
        validationSchema: Yup.object().shape({
            email: Yup.string().matches(regex.email, 'Invalid Email Address').required('Email Required'),
            // password: Yup.string().matches(regex.password, 'Incorrect Password').min(6, 'Too Short!').required('Password Required'),
        }),
        onSubmit: async (values) => {
            try {
                await doLogin(values).unwrap();
                const x = setTimeout(() => {
                    navigate('/');
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
                    Sign in to your account
                </h2>
                <span className="block text-center">Or</span>
                <span className="block text-center py-1">Use Demo Account for Testing porpos.</span>
                
                <div className="flex items-center">
                    <div className="flex-auto text-emerald-500 text-xs font font-medium">
                        <div><span className="font-bold text-slate-900">Email: </span>demo.user@example.com</div>
                        <div><span className="font-bold text-slate-900">Password: </span> 12345@Demo</div>
                        <div><span className="font-bold text-slate-900">Role: </span> User</div>
                    </div>
                    <button onClick={() => form.setValues({email: 'demo.user@example.com', password:'12345@Demo'})} className="ml-4 cursor-pointer flex-none text-xs rounded-md px-2 py-[0.3125rem] font-medium text-emerald-700 shadow-sm ring-1 ring-emerald-700/10 hover:bg-emerald-50">
                        Use Credentials
                    </button>
                </div>
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                {isError && <Alert when={isError} type={'error'}>
                    {error?.errors ? error.errors.msg : error.message}
                </Alert>}
                {isSuccess && <Alert when={isSuccess} type={'success'}>
                    Welcome, Your will redirect to Dashboard.
                </Alert>}
                <form onSubmit={form.handleSubmit} className="space-y-2">
                    <Input type="email" name="email" label="Email Address" form={form} placeholder="username@emaple.com" required autoComplete="" />
                    <PasswordInput type="password" label="Password" name="password" form={form} required autoComplete="current-password" placeholder="Password" id="password" />
                    <div>
                        <p className="mt-3 mb-2 text-sm">
                            <Link to="" className="font-semibold text-indigo-600 hover:text-indigo-500">
                                Forgot password?
                            </Link>
                        </p>
                        <button type="submit" className={clsx(
                            'inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                            isLoading && 'transition ease-in-out duration-150 cursor-not-allowed'
                        )}
                            disabled={isLoading}
                        >
                            <Loader when={isLoading} rightTitle={'Processing...'} />
                            {!isLoading && 'Sign Up'}
                        </button>
                    </div>
                </form>
                <p className="mt-10 text-center text-sm text-gray-500">
                    Not a member?{' '}
                    <Link to="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                        Create Account Now
                    </Link>
                </p>
            </div>
        </div>
    </>)
}
