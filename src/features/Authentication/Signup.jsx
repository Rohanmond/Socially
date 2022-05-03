import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signupHandler } from './authenticationSlice';
import { validateEmail, validatePassword } from './auth-utils';

export const Signup = () => {
  const { token, user, isLoading } = useSelector(
    (store) => store.authentication
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [signupForm, setSignupForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });
  const [signupFormError, setSignupFormError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (token) {
      navigate(location?.state?.from?.pathname || '/', { replace: true });
    }
  }, [token]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let flagErr = false;
    let newFormError = {};
    Object.keys(signupFormError).forEach((key) => {
      newFormError[key] = '';
      if (signupForm[key] === '' && key !== 'confirm-password') {
        newFormError[key] = `${key} shouldn't be empty`;
        flagErr = true;
      }
    });
    if (signupFormError.password) return;
    if (flagErr) {
      setSignupFormError(newFormError);
      return;
    }
    dispatch(signupHandler(signupForm));
  };

  return (
    <div className='w-full min-h-screen flex flex-col bg-white'>
      <div className='py-6 sm:py-3  bg-indigo-100  flex justify-center'>
        <div className='cursor-pointer flex items-center justify-center'>
          <div>
            <img
              className='w-12 h-12'
              src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650084912/logo_tzzpf3.png'
              alt='hero'
            />
          </div>
          <div className='text-2xl text-indigo-800 tracking-wide ml-2 font-semibold'>
            Socially
          </div>
        </div>
      </div>
      <div className='w-1/2 md:w-full bg-white mt-10 px-12 sm:px-6 self-center'>
        {isLoading ? (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <img
              src='https://res.cloudinary.com/donqbxlnc/image/upload/v1651565040/auth-loader_atroq7.gif'
              alt=''
            />
          </div>
        ) : null}

        <h2 className='text-center text-4xl text-indigo-900 font-display font-semibold'>
          Sign up
        </h2>
        <div className='mt-12'>
          <form className='flex  flex-col' onSubmit={onSubmitHandler}>
            <div className='flex flex-grow  gap-8'>
              <div className='justify-self-stretch flex-grow'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  First Name
                </div>
                <input
                  value={signupForm.firstName}
                  onChange={(e) => {
                    setSignupForm({ ...signupForm, firstName: e.target.value });
                    setSignupFormError({ ...signupFormError, firstName: '' });
                  }}
                  className='w-full text-lg p-2  border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  type='text'
                  placeholder='Mike'
                />
              </div>
              <div className='justify-self-stretch flex-grow'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Last Name
                </div>
                <input
                  className='w-full text-lg p-2  border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                  type='text'
                  placeholder='Ramdon'
                  value={signupForm.lastName}
                  onChange={(e) => {
                    setSignupForm({ ...signupForm, lastName: e.target.value });
                    setSignupFormError({ ...signupFormError, lastName: '' });
                  }}
                />
              </div>
            </div>
            {signupFormError.firstName || signupFormError.lastName ? (
              <div className='text-red-500 font-semibold self-center text-sm'>
                {"Firstname or lastname can't be empty"}
              </div>
            ) : null}
            <div className='mt-8'>
              <div className='text-sm font-bold text-gray-700 tracking-wide'>
                Email Address
              </div>
              <input
                className='w-full text-lg p-2  border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                type='email'
                placeholder='mike@gmail.com'
                value={signupForm.email}
                onChange={(e) => {
                  setSignupForm({ ...signupForm, email: e.target.value });
                  if (!validateEmail(e.target.value)) {
                    setSignupFormError({
                      ...signupFormError,
                      email: 'Email should be in correct format',
                    });
                  } else {
                    setSignupFormError({ ...signupFormError, email: '' });
                  }
                }}
              />
              {signupFormError.email ? (
                <div className='text-red-500 font-semibold self-center text-sm'>
                  {signupFormError.email}
                </div>
              ) : null}
            </div>
            <div className='flex flex-col mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Password
                </div>
              </div>
              <div className='flex items-center border-b border-gray-300 focus:border-indigo-500'>
                <input
                  className='w-full text-lg p-2 focus:outline-none'
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Enter your password'
                  value={signupForm.password}
                  onChange={(e) => {
                    setSignupForm({ ...signupForm, password: e.target.value });
                    if (!validatePassword(e.target.value)) {
                      setSignupFormError({
                        ...signupFormError,
                        password:
                          'Password should be in 8 to 20 chars and should have one digit',
                      });
                    } else {
                      setSignupFormError({ ...signupFormError, password: '' });
                    }
                  }}
                />
                {!showPassword ? (
                  <i
                    onClick={() => setShowPassword(true)}
                    className='text-lg cursor-pointer text-txt-secondary-color far fa-eye-slash'
                  ></i>
                ) : (
                  <i
                    onClick={() => setShowPassword(false)}
                    className='text-lg cursor-pointer text-txt-secondary-color far fa-eye'
                  ></i>
                )}
              </div>
              {signupFormError.password ? (
                <div className='text-red-500 font-semibold self-center text-sm'>
                  {signupFormError.password}
                </div>
              ) : null}
            </div>
            <div className='mt-10 flex flex-col gap-4'>
              <button
                className='bg-primary text-white p-3 sm:p-2 w-full rounded-full tracking-wide
                                  font-semibold font-display focus:outline-none focus:shadow-outline active:bg-blue-500
                                  shadow-lg'
                type='submit'
              >
                Sign up
              </button>
            </div>
          </form>
          <div className='mt-12 sm:mt-8 mb-6 text-sm font-display font-semibold text-gray-700 text-center'>
            Already having an account ?{' '}
            <Link
              to={'/login'}
              replace={true}
              className='cursor-pointer text-indigo-600 hover:text-indigo-800'
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
