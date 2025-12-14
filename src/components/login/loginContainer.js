"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import FormSelect from "../fromField/FormSelect";
import useGetData from "@/utils/useGetData";

const ORANGE = "#FF6F0B";

export default function LoginDesignPro() {
  const [credentials, setCredentials] = useState({ Username: "", Password: "",FYID:"" });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedInput, setFocusedInput] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  let url =
    '?action=get_financialyears';

  let { status, data } = useGetData(url);
  const handleChange = e => {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = async e => {
     e.preventDefault();
     if (!credentials.Username && !credentials.Password && !credentials.FYID) return;
 
     setLoading(true); // Set loading to true when submission starts
     try {
       const res = await signIn('credentials', {
         ...credentials,
         redirect: false,
       });
       console.log(res)
       if (res.status === 200) {
         router.replace('/dashboard');
       }
     } catch (error) {
       console.log(error);
     } finally {
       setLoading(false); // Reset loading state when submission completes
     }
   };
 

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-primary1">
      {/* Main container */}
      <div className="relative z-10 bg-white rounded-3xl shadow-xl grid grid-cols-1 md:grid-cols-2 overflow-hidden w-full max-w-5xl animate-cardAppear">

        {/* LEFT SIDE — Illustration */}
        <div className="hidden md:flex items-center justify-center p-10 bg-white relative">
          <Image src="/images/report.png" alt="Logo" width={800} height={870} />
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="p-10 md:p-14 flex flex-col justify-center">

          {/* Logo */}
          <div className="flex justify-center items-center gap-3 mb-10 animate-fadeIn">
            <div className=" rounded-md flex items-center justify-center">
              <Image src="/images/Logo.png" alt="Logo" width={170} height={170} />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2 animate-slideUp">Login</h1>
          <p className="text-gray-600 mb-8 animate-slideUp2">Please enter your credentials</p>

          {/* Inputs */}
          <div className="space-y-6">
            <div className="animate-slideUp3">
              <input
                name="Username"
                value={credentials.Username}
                onChange={handleChange}
                placeholder="joe@gmail.com"
                onFocus={() => setFocusedInput("user")}
                onBlur={() => setFocusedInput(null)}
                className="w-full px-4 py-2.5 rounded-lg border transition-all outline-none text-gray-800 placeholder-gray-400"
                style={{
                  borderColor: focusedInput === "user" ? ORANGE : "#ddd",
                  boxShadow:
                    focusedInput === "user"
                      ? "0 4px 10px rgba(255,111,11,0.22)"
                      : "none",
                }}
              />
            </div>

            <div className="relative animate-slideUp4">
              <input
                name="Password"
                value={credentials.Password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                placeholder="********"
                onFocus={() => setFocusedInput("pass")}
                onBlur={() => setFocusedInput(null)}
                className="w-full px-4 py-2.5 rounded-lg border transition-all outline-none text-gray-800 placeholder-gray-400"
                style={{
                  borderColor: focusedInput === "pass" ? ORANGE : "#ddd",
                  boxShadow:
                    focusedInput === "pass"
                      ? "0 4px 10px rgba(255,111,11,0.22)"
                      : "none",
                }}
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600"
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
             <div className="animate-slideUp4">
              <FormSelect
                  label="Financial Year"
                  id="FinancialYear"
                  value={credentials.FYID}
                  onChange={e => setCredentials({ ...credentials, FYID: e.target.value })}
                  options={data || []}
                  valueKey="id"
                  labelKey="name"
                  required={true}
                  searchable={false}
                  placeholder="Select Financial Year"
                  style={{
                    borderColor: focusedInput === "pass" ? ORANGE : "#ddd",
                    boxShadow:
                      focusedInput === "pass"
                        ? "0 4px 10px rgba(255,111,11,0.22)"
                        : "none",
                  }}
                />
             </div>
            {/* Remember + Forgot */}
            {/* <div className="flex items-center justify-between text-sm animate-slideUp5">
              <label className="flex items-center gap-2 text-gray-700">
                <input type="checkbox" className="accent-orange-500 w-4 h-4" />
                Remember me
              </label>

              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                Forgot password?
              </button>
            </div> */}

            {/* LOGIN button */}
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full px-4 py-2.5 rounded-xl text-white font-semibold transition-all transform active:scale-95 mt-4"
              style={{
                background: ORANGE,
                boxShadow: "0 4px 10px rgba(255,111,11,0.28)",
              }}
            >
              {loading ? "Signing in..." : "Login"}
            </button>
            {!credentials.Username && !credentials.Password && !credentials.FYID && <p className="text-red-500 text-center text-sm">Please fill in all fields</p>}
            {/* Divider */}
            <div className="flex items-center my-6 animate-fadeIn">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 text-sm">or</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            {/* Sign Up */}
            <p className="text-center text-sm text-gray-700 animate-fadeIn">
              Don't have an account?{" "}
              <span className="text-orange-500 font-semibold cursor-pointer hover:underline">
                Sign Up
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes cardAppear {
          from { opacity: 0; transform: translateY(20px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes slideUp { from { opacity: 0; transform: translateY(20px);} to { opacity:1; transform:translateY(0);} }
        .animate-slideUp { animation: slideUp 0.5s ease forwards; }

        @keyframes slideUp2 { from { opacity: 0; transform: translateY(24px);} to { opacity:1; transform:translateY(0);} }
        .animate-slideUp2 { animation: slideUp2 0.6s ease forwards; }

        @keyframes slideUp3 { from { opacity: 0; transform: translateY(28px);} to { opacity:1; transform:translateY(0);} }
        .animate-slideUp3 { animation: slideUp3 0.7s ease forwards; }

        @keyframes slideUp4 { from { opacity: 0; transform: translateY(32px);} to { opacity:1; transform:translateY(0);} }
        .animate-slideUp4 { animation: slideUp4 0.8s ease forwards; }

        @keyframes slideUp5 { from { opacity: 0; transform: translateY(34px);} to { opacity:1; transform:translateY(0);} }
        .animate-slideUp5 { animation: slideUp5 0.9s ease forwards; }

        .animate-cardAppear { animation: cardAppear 0.8s ease forwards; }
        .animate-fadeIn { animation: fadeIn 1s ease forwards; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </div>
  );
}