import { Outlet } from "react-router-dom";
import Navbar from './Ui/Navbar';
import Notification from "./Ui/Notification";
import Navigation from "./Ui/Navigation";

export default function Layout () {

    return (<>
        <div className="bg-white min-h-screen flex flex-col">
            <header className="flex-none">
                {/* <Navbar /> */}
                <Navigation />
            </header>
            <main className="flex-grow">
                <Outlet/>
            </main>
            <footer className="flex-none text-center text-lg bg-gray-950 text-white px-10 py-16">
                <h1>Footer</h1>
            </footer>

            <Notification />
        </div>        
    </>)
}