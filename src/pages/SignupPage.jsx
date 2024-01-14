import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useSignupMutation } from '../hooks/userUserHook';
import { useEffect, useState } from 'react';
import { setCredentials } from '../slices/userSlice';
import { Spin } from 'antd';
function SignupPage() {
  const [passwordType, setPasswordType] = useState('password');
  const [passwordConfirmType, setPasswordConfirmType] = useState('password');
  const { register, handleSubmit, formState } = useForm();
  const { errors } = formState;

  const { user } = useSelector(state => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    mutate,
    data: userData,
    isFetching,
    isPending,
    error,
  } = useSignupMutation();

  useEffect(
    function () {
      if (!isFetching && userData) {
        navigate('/user/dashboard', { replace: true });
        dispatch(setCredentials({ ...userData }));
      }
    },
    [dispatch, navigate, isFetching, userData]
  );

  function onSubmit(data) {
    mutate({ ...data });
  }
  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin />
      </div>
    );
  }
  return (
    <>
      {user ? (
        <Navigate to="/user/dashboard" replace />
      ) : (
        <section className=" font-poppins">
          <div className="max-w-6xl px-0 mx-auto lg:px-6">
            <div className="flex flex-col items-center h-full md:flex-row">
              <div className="flex items-center justify-center h-screen max-w-full px-0 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 lg:px-16 xl:px-12">
                <div className="z-10 w-full p-10 bg-gray-100 dark:bg-gray-900 h-100">
                  <h2 className="text-xl font-bold leading-tight mb-7 md:text-3xl dark:text-gray-300">
                    Register for a new account
                  </h2>
                  <form
                    action=""
                    className="mt-6"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <div>
                      <label
                        className="block text-gray-700 dark:text-gray-300"
                        htmlFor=""
                      >
                        Name:
                      </label>
                      <input
                        className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                        name="name"
                        placeholder="Enter your email"
                        type="text"
                        {...register('name', { required: 'name is required' })}
                      />
                      {errors && (
                        <p className="text-red-600">{errors?.name?.message}</p>
                      )}
                    </div>

                    <div className="mt-5">
                      <label
                        className="block text-gray-700 dark:text-gray-300"
                        htmlFor=""
                      >
                        Email:
                      </label>
                      <input
                        className="w-full px-4 py-3 mt-2 bg-white rounded-lg dark:text-gray-100 dark:bg-gray-800 dark:border dark:border-gray-800"
                        name="email"
                        placeholder="Enter your email"
                        type="email"
                        {...register('email', {
                          required: 'email is required',
                        })}
                      />
                      {errors && (
                        <p className="text-red-600">{errors?.email?.message}</p>
                      )}
                    </div>
                    <div className="mt-5">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-300 "
                          htmlFor=""
                        >
                          Password:
                        </label>
                        <div className="relative flex items-center mt-2">
                          <input
                            className="w-full px-4 py-3 bg-white rounded-lg dark:text-gray-400 dark:bg-gray-800 dark:border dark:border-gray-800 "
                            name="password"
                            placeholder="Enter password"
                            type={passwordType}
                            {...register('password', {
                              required: 'password is required',
                            })}
                          />
                          <svg
                            className="absolute right-0 mr-3 dark:text-gray-300"
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 16 16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() =>
                              setPasswordType(type =>
                                type === 'password' ? 'text' : 'password'
                              )
                            }
                          >
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        </div>
                      </div>
                      {errors && (
                        <p className="text-red-600">
                          {errors?.password?.message}
                        </p>
                      )}
                    </div>

                    <div className="mt-5">
                      <div>
                        <label
                          className="text-gray-700 dark:text-gray-300 "
                          htmlFor=""
                        >
                          Confirm Password:
                        </label>
                        <div className="relative flex items-center mt-2">
                          <input
                            className="w-full px-4 py-3 bg-white rounded-lg dark:text-gray-400 dark:bg-gray-800 dark:border dark:border-gray-800 "
                            name="passwordConfirm"
                            placeholder="Enter password"
                            type={passwordConfirmType}
                            {...register('passwordConfirm', {
                              required: 'confirm password is required',
                            })}
                          />
                          <svg
                            className="absolute right-0 mr-3 dark:text-gray-300"
                            fill="currentColor"
                            height="16"
                            viewBox="0 0 16 16"
                            width="16"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() =>
                              setPasswordConfirmType(type =>
                                type === 'password' ? 'text' : 'password'
                              )
                            }
                          >
                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                          </svg>
                        </div>
                      </div>
                      {errors && (
                        <p className="text-red-600">
                          {errors?.passwordConfirm?.message}
                        </p>
                      )}
                    </div>

                    <button
                      className="w-full px-4 py-3 mt-6 font-semibold text-gray-200 bg-blue-600 rounded-lg hover:text-gray-700 hover:bg-blue-200 "
                      type="submit"
                    >
                      Signup
                    </button>
                    {!isFetching && error && (
                      <p className="mt-1 text-red-600">
                        {error.response.data.err}
                      </p>
                    )}
                    <p className="mt-6 text-gray-700 dark:text-gray-300">
                      {' '}
                      Already have an account?
                      <Link
                        className="font-semibold text-blue-500 hover:text-blue-700"
                        to="/login"
                      >
                        {' '}
                        Login
                      </Link>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default SignupPage;
