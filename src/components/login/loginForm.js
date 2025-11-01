'use client';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaUser } from 'react-icons/fa';
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { RiLockPasswordFill } from 'react-icons/ri';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({
    Username: '',
    Password: '',
  });
  const [loading, setLoading] = useState(false); // Added loading state
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleChange = e => {
    setCredentials(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!credentials.Username || !credentials.Password) return;

    setLoading(true); // Set loading to true when submission starts
    try {
      const res = await signIn('credentials', {
        ...credentials,
        redirect: false,
      });
      if (res.ok) {
        router.replace('/dashboard');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false); // Reset loading state when submission completes
    }
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="w-full flex items-center border border-text2 rounded-md mb-4">
        <label className="px-4" htmlFor="empId">
          <FaUser />
        </label>
        <input
          id="empId"
          className="w-full text-md outline-0 border-0 focus:ring-0 rounded-md"
          type="text"
          placeholder="Employee Id Or UserName"
          name="Username"
          onChange={handleChange}
          required
        />
      </div>
      <div className="w-full flex items-center border border-text2 rounded-md mb-6">
        <label className="px-4" htmlFor="pass">
          <RiLockPasswordFill />
        </label>
        <input
          id="pass"
          className="w-full text-md outline-0 border-0 focus:ring-0 rounded-md"
          type={showPassword ? 'text' : 'password'}
          placeholder="Password"
          name="Password"
          onChange={handleChange}
          required
        />
         <label className="px-4" htmlFor="pass">
          {showPassword ? (
            <FaRegEyeSlash onClick={() => setShowPassword(false)} />
          ) : (
            <FaRegEye onClick={() => setShowPassword(true)} />
          )}
        </label>
      </div>

      <button
        type="submit"
        className="bg-primary1 w-full py-3 rounded-full text-surface1 flex items-center justify-center"
        disabled={loading} // Disable button during loading
      >
        {loading ? (
          <>
            <svg
              className="animate-spin h-5 w-5 mr-2 text-surface1"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Signing in...
          </>
        ) : (
          'Sign in'
        )}
      </button>
    </form>
  );
};

export default LoginForm;