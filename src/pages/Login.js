import React from 'react'
import { FcGoogle } from "react-icons/fc";
import {
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [user, loading] = useAuthState(auth);
    const navigate = useNavigate();
    //Sign in with google
    const googleProvider = new GoogleAuthProvider();
    const GoogleLogin = async () => {
      try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result.user);
        navigate('/blogs')
      } catch (error) {
        console.log(error);
      }}

      useEffect(() => {
        if (user) {
          console.log('it worked')
        } else {
          console.log("login");
        }
      }, [user]);
  return (
    <div className="shadow-xl mt-32 p-10 text-gray-700 rounded-lg">
    <h2 className="text-3xl font-medium">Join today</h2>
    <div className="py-4">
      <h3 className="py-4">Sign in with one of the providers</h3>
      <div className="flex flex-col gap-4">
        <button
          onClick={GoogleLogin}
          className="text-white bg-gray-700 p-4 w-full font-medium rounded-lg flex align-middle gap-2 "
        >
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
      </div>
    </div>
  </div>
  )
}

export default Login