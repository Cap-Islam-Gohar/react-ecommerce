import { ArrowLeftEndOnRectangleIcon } from "@heroicons/react/24/solid";
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link, useNavigate } from "react-router-dom";
import Input from "../Ui/Input";
import Loader from "../Ui/Loader";
import Alert from "../Ui/Alert";
import PasswordInput from "../Ui/PasswordInput";
import { useLoginMutation } from "../../Redux/Api/Service";

export default function Login() {

    const [serverResponse, setServerResponse] = useState({
        state: '',
        message: '',
    });

    const regex = {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        // password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s])\S{8,100}$/,
    };  

    const navigate = useNavigate();

    const [doLogin, { isLoading, isError, isSuccess, error, data:response}] = useLoginMutation(); 
    
    const form = useFormik({
        initialValues: { name: '', email: '', password: '' },
        validationSchema: Yup.object().shape({
            email: Yup.string().matches(regex.email, 'Invalid Email Address').required('Email Required'),
            password: Yup.string().matches(regex.password, 'Incorrect Password').min(6, 'Too Short!').required('Password Required'),
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
            </div>
            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                { isError && <Alert when={isError} type={'error'}>
                    { error?.errors ? error.errors.msg : error.message }
                </Alert>}
                { isSuccess && <Alert when={isSuccess} type={'success'}>
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
                        <button type="submit" className={['inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
                            isLoading && 'transition ease-in-out duration-150 cursor-not-allowed'].join(" ")}
                            disabled={isLoading}
                        > 
                            <Loader when={isLoading} rightTitle={'Processing...'} />
                            { !isLoading && 'Sign Up' }
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
