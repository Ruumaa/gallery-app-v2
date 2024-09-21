'use client';

import { useForm } from 'react-hook-form';
import Link from 'next/link';
const AuthForm = ({ isRegister, submit, loading }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex justify-center items-center h-screen">
      {/* CARD */}
      <div className="card w-full sm:max-w-md bg-base-100 h-64  shadow-2xl z-50 border-2 border-primary">
        {/* ICON */}
        <div className="z-30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-36 h-36 absolute ml-auto mr-auto left-0 right-0 text-center -top-24 bg-base-100 rounded-full shadow-xl"
          >
            <path
              fillRule="evenodd"
              d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="mt-20 w-2/3 mx-auto">
          <form
            onSubmit={handleSubmit(submit)}
            className="flex-col flex w-full gap-3"
          >
            {/* FORM */}
            <div className="flex flex-col relative">
              <div className="flex gap-2  items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                    clipRule="evenodd"
                  />
                </svg>

                <input
                  className="w-full h-9 bg-base-100 rounded-md border-2 border-primary border-solid px-2 py-1 "
                  placeholder="Username"
                  {...register('username', { required: true })}
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm m-px ml-8">
                  Username is required
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  className="w-full h-9 bg-base-100 rounded-md px-2 py-1 border-2 border-primary border-solid"
                  placeholder="Password"
                  {...register('password', { required: true })}
                  type="password"
                />
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm m-px ml-8">
                  Password is required
                </p>
              )}
            </div>

            {/* LINK */}
            <p className="text-end text-sm -m-2 mr-1">
              {isRegister ? (
                <Link
                  href="/auth/sign-in"
                  className=" hover:underline font-medium hover:text-primary cursor-pointer"
                >
                  Sign in
                </Link>
              ) : (
                <Link
                  href="/auth/sign-up"
                  className=" hover:underline font-medium hover:text-primary cursor-pointer"
                >
                  Sign up
                </Link>
              )}
            </p>
            {/* BUTTON */}
            <div className="flex mx-auto w-full absolute  ml-auto mr-auto left-0 right-0 text-center -bottom-11 z-10">
              <div className="card w-3/4 h-16 mx-auto">
                <button className="btn btn-primary shadow-2xl ">
                  {loading ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Wait a moment...
                    </>
                  ) : isRegister ? (
                    'Register'
                  ) : (
                    'Login'
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
