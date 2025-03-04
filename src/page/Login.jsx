import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../Context/AuthContext';
import { baseUrl } from "../compontents/constant";


export default function LoginForm() {

  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);
  const toastId = toast.loading("Processing...");


  toast.dismiss(toastId);

  const [isLoading, setLoding] = useState(false);

  const user = {
    email: "",
    password: "",
  };

  const validYup = Yup.object().shape({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters"),
  });

  async function signin(values) {
    setLoding(true);
    const toastId = toast.loading("Processing...");



    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/auth/signin`, values);

      if (data?.token) {
        localStorage.setItem("tkn", data.token);
        setToken(data.token);
        toast.dismiss(toastId);
        toast.success(data.message || "Login successful!");
        navigate("/");

      } else {
        toast.dismiss(toastId);
        toast.error("Login failed. No token received.");
      }
    } catch (e) {

      console.log("Error:", e);

      if (e.response) {

        console.log("Error response:", e.response);
        if (e.response?.data?.message) {
          setLoding(true)
          toast.dismiss(toastId);
          toast.error(e.response.data.message);
        } else {
          toast.dismiss(toastId);
          toast.error("Something went wrong. Please try again.");
        }
      } else if (e.message) {
        console.log("Error message:", e.message);
        toast.dismiss(toastId);
        toast.error("Unable to connect to the server. Please try again later.");
      } else {
        toast.dismiss(toastId);
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoding(false);
    }
  }

  const formik = useFormik({
    initialValues: user,
    onSubmit: async (values) => {
      console.log("Formik values before submit:", values);
      try {
        await signin(values);
      } catch (error) {
        console.log("Signin error:", error);
      }
    },
    validationSchema: validYup,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center text-gray-700 mb-4">
          Login
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

          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`focus:outline-none text-white font-medium rounded-lg text-sm px-5 py-2.5 
                                ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"}
                            `}
          >
            {isLoading ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Login"}
          </button>

          <p className="text-center text-sm text-gray-600">
            forget your password ?
            <a href="/forgetpassword" className="text-green-600 font-bold">
              Reset password..
            </a>
          </p>

          <p className="text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/register" className="text-green-600 font-bold">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

