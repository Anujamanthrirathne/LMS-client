"use client";
import React, { FC, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../../../app/styles/style";
import { useLoginMutation } from "@/redux/auth/authApi";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react"

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open:boolean) => void;
};

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email!"),
  password: Yup.string()
    .required("Please enter your password!")
    .min(6, "Password must be at least 6 characters"),
});

const Login: FC<Props> = ({ setRoute,setOpen }) => {
  const [show, setShow] = useState(false);
  const [login,{isSuccess,error}] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
     await  login({email,password})
    },
  });

  useEffect(() => {
     if(isSuccess){
      toast.success("Login Successfully!")
      setOpen(false);
     }
     if(error){
      if("data" in error){
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
     }
  },[isSuccess,error])

  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full">
      <h1 className={`${styles.title}`}>Login with ELearning</h1>
      <form onSubmit={handleSubmit}>
        {/* Email Input */}
        <label className={`${styles.label}`} htmlFor="email">
          Enter Your Email
        </label>
        <input
          type="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="loginmail@gmail.com"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          }`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-2 block">{errors.email}</span>
        )}

        {/* Password Input */}
        <div className="w-full mt-5 relative mb-1">
          <label className={`${styles.label}`} htmlFor="password">
            Enter Your Password
          </label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="password!@%"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input}`}
          />
          {/* Toggle Visibility Icon */}
          {!show ? (
            <AiOutlineEyeInvisible
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={20}
              onClick={() => setShow(true)}
            />
          ) : (
            <AiOutlineEye
              className="absolute bottom-3 right-2 z-1 cursor-pointer text-black dark:text-white"
              size={20}
              onClick={() => setShow(false)}
            />
          )}
          {errors.password && touched.password && (
            <span className="text-red-500 pt-2 block">{errors.password}</span>
          )}
        </div>

        {/* Submit Button */}
        <div className="w-full mt-5">
          <input type="submit" value="Login" className={`${styles.button}`} />
        </div>

        {/* Divider */}
        <br />
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Or join with
        </h5>

        {/* Social Login Icons */}
        <div className="flex items-center justify-center my-3 gap-4">
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition">
            <FcGoogle size={30}
             onClick={() => signIn("google")}
             />
          </div>
          <div className="p-3 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer transition">
            <AiFillGithub size={30} className="text-black dark:text-white" 
              onClick={() => signIn("github")}
             />
          </div>
        </div>
        {/* Sign Up Link */}
        <h5 className="text-center pt-4 font-Poppins text-[14px] text-black dark:text-white">
          Not have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 font-semibold cursor-pointer hover:underline"
            onClick={() => setRoute("sign-up")}
          >
            Sign Up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
