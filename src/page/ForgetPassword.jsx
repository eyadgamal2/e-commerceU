import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../compontents/constant";
import { useState } from "react";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [isLoading, setLoding] = useState(false);

    const user = {
        email: "",
    };

    const validYup = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
    });

    async function signin(values) {
        setLoding(true);
        const toastId = toast.loading("Processing..."); // ✅ إنشاء التحذير فقط عند بداية العملية

        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/auth/forgotPasswords`, values);
            console.log(data);
            toast.dismiss(toastId);
            toast.success(data.message || "Verify Code sent!");
            navigate("/verifycode");
        } catch (e) {
            console.log("Error:", e);
            if (e.response?.data?.message) {
                toast.dismiss(toastId);
                toast.error(e.response.data.message);
            } else {
                toast.dismiss(toastId);
                toast.error("Something went wrong. Please try again.");
            }
        } finally {
            setLoding(false);
        }
    }

    const formik = useFormik({
        initialValues: user,
        onSubmit: async (values) => {
            await signin(values);
        },
        validationSchema: validYup,
    });

    return (
        <div className=" container bg-white p-6 rounded-lg mx-auto my-52 shadow-lg w-full h-full">
            <h1 className="text-2xl font-bold capitalize text-gray-700 mb-4">
                please enter your verification code
            </h1>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {formik.touched.email && formik.errors.email && (
                        <p className="text-red-500 text-sm">{formik.errors.email}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`border border-green-500 outline-green-500 text-green-500 font-medium rounded-lg text-sm px-5 py-2.5 
                            ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-none hover:text-white  hover:bg-green-500"}
                        `}
                >
                    {isLoading ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Verify"}
                </button>
            </form>
        </div>
    );
}
