import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginHandler } from './authenticationSlice';
import { validateEmail } from './auth-utils';
import { useOutsideClickHandler } from '../../custom-hooks';

export const Login = () => {
  const { token, isLoading } = useSelector((store) => store.authentication);
  const dipatch = useDispatch();
  const [openDropDown, setOpenDropDown] = useState(false);
  const dropdownRef = useRef();
  const { resetMenu } = useOutsideClickHandler(dropdownRef);
  const [testCred, setTestCred] = useState('1');

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const [loginInputError, setLoginInputError] = useState({
    email: '',
    password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let flagErr = false;
    let newFormError = {};
    Object.keys(loginInputError).forEach((key) => {
      newFormError[key] = '';
      if (loginInput[key] === '') {
        newFormError[key] = `${key} shouldn't be empty`;
        flagErr = true;
      }
    });

    if (flagErr) {
      setLoginInputError(newFormError);
      return;
    }
    dipatch(
      loginHandler({
        username: loginInput.email,
        password: loginInput.password,
      })
    );
  };

  useEffect(() => {
    if (resetMenu) {
      setOpenDropDown(false);
    }
  }, [resetMenu]);

  useEffect(() => {
    if (token) {
      navigate(location?.state?.from?.pathname || '/', { replace: true });
    }
  }, [token]);

  return (
    <div className='w-full  min-h-screen flex  flex-col bg-white'>
      <div className='py-6 bg-indigo-100  flex justify-center'>
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
      <div className='w-1/2 md:w-full bg-white mt-10 px-12 self-center'>
        {isLoading ? (
          <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <img
              src='https://res.cloudinary.com/donqbxlnc/image/upload/v1651565040/auth-loader_atroq7.gif'
              alt=''
            />
          </div>
        ) : null}
        <h2 className='text-center text-4xl text-indigo-900 font-display font-semibold'>
          Sign in
        </h2>
        <div className='mt-12'>
          <form onSubmit={onSubmitHandler}>
            <div className='flex flex-col'>
              <div className='text-sm font-bold text-gray-700 tracking-wide'>
                Email Address
              </div>
              <div className='border-b border-gray-300'>
                <input
                  className='w-full text-lg p-2 focus:outline-none'
                  type='email'
                  value={loginInput.email}
                  onChange={(e) => {
                    setLoginInput({ ...loginInput, email: e.target.value });
                    if (!validateEmail(e.target.value)) {
                      setLoginInputError({
                        ...loginInputError,
                        email: 'Email should be in correct format',
                      });
                    } else {
                      setLoginInputError({ ...loginInputError, email: '' });
                    }
                  }}
                  placeholder='mike@gmail.com'
                />
              </div>
              {loginInputError.email ? (
                <div className='text-red-500 font-semibold self-center text-sm'>
                  {loginInputError.email}
                </div>
              ) : null}
            </div>
            <div className='mt-8 flex flex-col'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Password
                </div>
              </div>
              <div className='flex items-center border-b border-gray-300'>
                <input
                  value={loginInput.password}
                  className='w-full text-lg p-2  focus:outline-none'
                  type={showPassword ? 'text' : 'password'}
                  onChange={(e) => {
                    setLoginInput({ ...loginInput, password: e.target.value });
                    if (e.target.value !== '') {
                      setLoginInputError({
                        ...loginInputError,
                        password: '',
                      });
                    }
                  }}
                  placeholder='Enter your password'
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
              {loginInputError.password ? (
                <div className='text-red-500 font-semibold self-center text-sm'>
                  {loginInputError.password}
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
                Log In
              </button>
              <button
                type='submit'
                onClick={() => {
                  switch (testCred) {
                    case '1': {
                      setLoginInput({
                        email: 'rohan@gmail.com',
                        password: '1234abcd',
                      });
                      break;
                    }
                    case '2': {
                      setLoginInput({
                        email: 'rajanighosh@gmail.com',
                        password: '1234abcd',
                      });
                      break;
                    }
                    case '3': {
                      setLoginInput({
                        email: 'devikagill@gmail.com',
                        password: '1234asdf',
                      });
                      break;
                    }
                    case '4': {
                      setLoginInput({
                        email: 'suhashdugar@gmail.com',
                        password: '1234asdf',
                      });
                      break;
                    }
                    default:
                  }

                  setLoginInputError({ email: '', password: '' });
                }}
                className='bg-primary outline-primary text-white p-3 sm:p-2 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline active:bg-blue-500
                                shadow-lg'
              >
                Log In With Test Credentials {testCred}
              </button>
            </div>
            <div className='mt-4 rounded-full flex flex-col items-center'>
              <div className='relative'>
                <div
                  onClick={() => setOpenDropDown((dr) => !dr)}
                  className='cursor-pointer flex justify-center rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500'
                >
                  Test Credentials Options
                  <svg
                    className='-mr-1 ml-2 h-5 w-5'
                    xmlns='http://www.w3.org/2000/svg'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                </div>
                {openDropDown ? (
                  <div
                    ref={dropdownRef}
                    className='origin-top-right absolute right-0 mt-2 w-1/2 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'
                  >
                    <div className='py-1'>
                      <div
                        onClick={() => {
                          setTestCred('1');
                          setOpenDropDown(false);
                        }}
                        className='cursor-pointer text-txt-secondary-color block w-full text-left px-4 py-2 text-sm'
                      >
                        Test 1
                      </div>
                      <div
                        onClick={() => {
                          setTestCred('2');
                          setOpenDropDown(false);
                        }}
                        className='cursor-pointer text-txt-secondary-color block w-full text-left px-4 py-2 text-sm'
                      >
                        Test 2
                      </div>
                      <div
                        onClick={() => {
                          setTestCred('3');
                          setOpenDropDown(false);
                        }}
                        className='cursor-pointer text-txt-secondary-color block w-full text-left px-4 py-2 text-sm'
                      >
                        Test 3
                      </div>
                      <button
                        onClick={() => {
                          setTestCred('4');
                          setOpenDropDown(false);
                        }}
                        className='cursor-pointer text-txt-secondary-color block w-full text-left px-4 py-2 text-sm'
                      >
                        Test 4
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </form>
          <div className='mt-12 text-sm font-display font-semibold text-gray-700 text-center'>
            Don't have an account ?{' '}
            <Link
              to={'/signup'}
              replace={true}
              state={location.state}
              className='cursor-pointer text-indigo-600 hover:text-indigo-800'
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
