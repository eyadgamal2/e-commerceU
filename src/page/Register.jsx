import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { baseUrl } from "./../compontents/constant";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(false);

  // ✅ Improved validation schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .matches(/^[A-Z][a-zA-Z\s]{2,30}$/, "Must start with uppercase, 3-30 letters")
      .required("Name is required"),
    email: Yup.string()
      .email("Enter a valid email address")
      .required("Email is required"),
    phone: Yup.string()
      .matches(/^(010|011|012|015)[0-9]{8}$/, "Enter a valid Egyptian phone")
      .required("Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .matches(/[A-Z]/, "Must contain at least one uppercase letter")
      .matches(/[0-9]/, "Must contain at least one number")
      .required("Password is required"),
    rePassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords do not match")
      .required("Confirm password is required"),
  });

  async function signup(values) {
    setLoading(true);
    try {
      const { data } = await axios.post(`${baseUrl}/api/v1/auth/signup`, values);
      if (data.message == "success") {
        toast.success("the account created successfully");
        navigate("/login");
      }
    }
    catch (error) {
      if (error?.response.data.errors) {
        toast.error(error?.response.data.errors.msg);

      } else {
        toast.error(error?.response.data.message);
      }
    }


    setLoading(false);
  }

  // ✅ Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      rePassword: "",
    },
    validationSchema,
    onSubmit: signup,
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-300 px-4">
      <div className="bg-white shadow-lg rounded-3xl overflow-hidden w-full max-w-4xl flex">
        {/* ✅ Green side section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-green-400 to-green-700 justify-center items-center text-white p-10">
          <div className="text-center">
            <h1 className="text-4xl font-bold">FRESH CART</h1>
            <p className="mt-2">The most popular online shop at Route Academy</p>
            <button className="mt-4 bg-white text-green-700 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transition">
              Read More
            </button>
          </div>
        </div>

        {/* ✅ Registration section */}
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-2xl font-bold text-center text-gray-800">Register</h1>
          <p className="text-center text-gray-600 mb-4">Create an account now</p>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...formik.getFieldProps("name")}
              />
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-sm">{formik.errors.name}</p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm">{formik.errors.email}</p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...formik.getFieldProps("phone")}
              />
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-sm">{formik.errors.phone}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password && (
                <p className="text-red-500 text-sm">{formik.errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <input
                type="password"
                name="rePassword"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                {...formik.getFieldProps("rePassword")}
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <p className="text-red-500 text-sm">{formik.errors.rePassword}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-500 transition-all disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Register"}
            </button>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-green-600 font-bold">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
