import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import { baseUrl } from "../compontents/constant";

export default function ResetPassword() {
    const navigate = useNavigate();
    const { token } = useContext(AuthContext);
    const [isLoading, setLoading] = useState(false);


    const initialValues = {
        currentPassword: "",
        password: "",
        rePassword: "",
    };

    const validationSchema = Yup.object({
        currentPassword: Yup.string().required("Current password is required"),
        password: Yup.string()
            .required("New password is required")
            .min(6, "Password must be at least 6 characters"),
        rePassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords do not match")
            .required("Confirm password is required"),
    });

    async function handlePasswordReset(values) {
        setLoading(true);
        const toastId = toast.loading("Updating password...");

        try {
            const { data } = await axios.put(
                `${baseUrl}/api/v1/users/changeMyPassword`,
                values,
                {
                    headers: { token },
                }
            );

            toast.dismiss(toastId);
            toast.success(data.message || "Password updated successfully!");
            navigate("/");
        } catch (e) {
            toast.dismiss(toastId);
            const errorMessage = e.response?.data?.message || "Something went wrong!";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handlePasswordReset,
    });

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
                    Change Password
                </h1>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <input
                            type="password"
                            name="currentPassword"
                            placeholder="Current Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.currentPassword}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.currentPassword && formik.errors.currentPassword && (
                            <p className="text-red-500 text-sm">{formik.errors.currentPassword}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="password"
                            placeholder="New Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.password && formik.errors.password && (
                            <p className="text-red-500 text-sm">{formik.errors.password}</p>
                        )}
                    </div>

                    <div>
                        <input
                            type="password"
                            name="rePassword"
                            placeholder="Confirm New Password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.rePassword}
                            className="w-full p-2 border border-gray-300 rounded"
                        />
                        {formik.touched.rePassword && formik.errors.rePassword && (
                            <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`border border-green-500 outline-green-500 text-green-500 font-medium rounded-lg text-sm px-5 py-2.5 
                            ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-none hover:text-white  hover:bg-green-500"}
                        `}
                    >
                        {isLoading ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "ٌReset Password"}
                    </button>
                </form>
            </div>
        </div>
    );
}
