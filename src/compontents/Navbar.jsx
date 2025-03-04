import { NavLink, useNavigate } from "react-router-dom";
import logo from './../assets/img/logo.svg'
import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { CartContext } from "../Context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { NumOfItems } = useContext(CartContext);
    const { token, setToken } = useContext(AuthContext);
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        localStorage.getItem("theme") === "dark"
    );
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            localStorage.setItem("theme", "light");
        }
    }, [darkMode]);

    function hendleLogout() {
        localStorage.removeItem("tkn");
        setToken(null);
        navigate("/login");
    }



    return (
        <nav className=" mx-auto bg-green-100 w-full">
            <div className="flex justify-between py-3 items-center flex-col md:flex-row">
                <img
                    src={logo}
                    alt="logo of the site Appexy"
                    className="h-6"
                />

                <ul className="flex gap-2 flex-col md:flex-row md:gap-6 items-center justify-center">
                    {token ? (
                        <>
                            <li className="text-gray-500 hover:text-green-500 hover:cursor-pointer capitalize transition-colors duration-100 active">
                                <NavLink to="/home" >Home</NavLink>
                            </li>
                            <li className="text-gray-500 hover:text-green-500  hover:cursor-pointer capitalize transition-colors duration-100">
                                <NavLink to="/cart" >Cart</NavLink>
                            </li>
                            <li className="text-gray-500 hover:text-green-500  hover:cursor-pointer capitalize transition-colors duration-100">
                                <NavLink to="/wishlist" >Wish List</NavLink>
                            </li>
                            <li className="text-gray-500 hover:text-green-500  hover:cursor-pointer capitalize transition-colors duration-100">
                                <NavLink to="/products" >Products</NavLink>
                            </li>
                            <li className="text-gray-500 hover:text-green-500  hover:cursor-pointer capitalize transition-colors duration-100">
                                <NavLink to="/catgories" >catgories</NavLink>
                            </li>
                            <li className="text-gray-500 hover:text-green-500  hover:cursor-pointer capitalize transition-colors  duration-100">
                                <NavLink to="/brands" >Brands</NavLink>
                            </li>
                        </>
                    ) : (
                        ""
                    )}
                </ul>

                <ul className="flex gap-2 flex-col md:flex-row md:gap-6 items-center justify-center md:px-10 ">
                    {!token ? (
                        <>
                            <li>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition-all duration-300"
                                >
                                    {darkMode ? (
                                        <i className="fa-solid fa-sun text-yellow-400 text-xl"></i>
                                    ) : (
                                        <i className="fa-solid fa-moon text-gray-900 text-xl"></i>
                                    )}
                                </button>
                            </li>
                            <li className="capitalize text-gray-700 hover:text-green-500 hover:cursor-pointer transition-colors duration-100">
                                <NavLink to="/login">Login</NavLink>
                            </li>
                            <li className="border-[0.5px] border-green-500 rounded capitalize bg-green-500/15 text-green-500 py-2 px-3 hover:bg-green-500 hover:text-white transition-colors duration-500">
                                <NavLink to="/register">Signup</NavLink>
                            </li>

                        </>
                    ) : (
                        <>
                            <li>
                                <NavLink to="/cart">
                                    <i className="fa-solid fa-cart-shopping text-gray-600"></i>
                                    <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-green-500 border-1 border-white rounded-full ">
                                        {NumOfItems}
                                    </div>
                                </NavLink>
                            </li>
                            <li>
                                <button
                                    onClick={() => setDarkMode(!darkMode)}
                                    className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 shadow-md transition-all duration-300"
                                >
                                    {darkMode ? (
                                        <i className="fa-solid fa-sun text-yellow-400 text-xl"></i>
                                    ) : (
                                        <i className="fa-solid fa-moon text-gray-900 text-xl"></i>
                                    )}
                                </button>
                            </li>
                            <li className="mx-2 my-2 md:my-0">
                                <button onClick={hendleLogout} className="capitalize text-gray-700 hover:text-green-500 transition-colors duration-100">Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    )
}
