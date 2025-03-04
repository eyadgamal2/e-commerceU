import Navbar from '../compontents/Navbar'
import { Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

export default function Layout() {
    return (
        <>
            <Toaster />
            <Navbar />
            <Outlet />
        </>
    )
}
 