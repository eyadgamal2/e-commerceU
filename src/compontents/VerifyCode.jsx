import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../compontents/constant";
import { useState } from "react";

export default function VerifyCode() {
    const navigate = useNavigate();
    const [isLoading, setLoding] = useState(false);

    const user = {
        resetCode: "",
    };

    const validYup = Yup.object().shape({
        resetCode: Yup.string()
            .length(6, "Invalid code format")
            .required("Code is required"),
    });

    async function signin(values) {
        setLoding(true);
        const toastId = toast.loading("Processing...");

        try {
            const { data } = await axios.post(`${baseUrl}/api/v1/auth/verifyResetCode`, values);
            toast.dismiss(toastId);
            toast.success(data.message || "Verify Code!");
            navigate("/resetpassword");
        } catch (e) {
            console.error("Error:", e.response?.data || e.message);
            toast.error(e.response?.data?.message || "Something went wrong. Please try again.");
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
        <div className="container bg-white p-6 rounded-lg mx-auto my-52 shadow-lg w-full h-full">
            <h1 className="text-2xl font-bold capitalize text-gray-700 mb-4">
                Please enter your verification code
            </h1>

            <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div>
                    <input
                        type="text"
                        name="resetCode"
                        placeholder="Enter reset code"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.resetCode}
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    {formik.touched.resetCode && formik.errors.resetCode && (
                        <p className="text-red-500 text-sm">{formik.errors.resetCode}</p>
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
