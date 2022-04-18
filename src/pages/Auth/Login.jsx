import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts';

export const Login = () => {
  const { loginHandler, token, user } = useAuth();
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
  });
  const location = useLocation();
  const navigate = useNavigate();

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginHandler(loginInput.email, loginInput.password);
  };
  useEffect(() => {
    if (token) {
      navigate(location.state.from.pathname || '/', { replace: true });
    }
  }, [token]);

  return (
    <div className='w-full min-h-screen flex flex-col bg-white'>
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
      <div className='w-1/2 lg:w-full bg-white mt-10 px-12 self-center'>
        <h2 className='text-center text-4xl text-indigo-900 font-display font-semibold'>
          Sign in
        </h2>
        <div className='mt-12'>
          <form onSubmit={onSubmitHandler}>
            <div>
              <div className='text-sm font-bold text-gray-700 tracking-wide'>
                Email Address
              </div>
              <input
                className='w-full text-lg p-2  border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                type='email'
                value={loginInput.email}
                onChange={(e) =>
                  setLoginInput({ ...loginInput, email: e.target.value })
                }
                placeholder='mike@gmail.com'
                required
              />
            </div>
            <div className='mt-8'>
              <div className='flex justify-between items-center'>
                <div className='text-sm font-bold text-gray-700 tracking-wide'>
                  Password
                </div>
              </div>
              <input
                value={loginInput.password}
                className='w-full text-lg p-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500'
                type='password'
                onChange={(e) =>
                  setLoginInput({ ...loginInput, password: e.target.value })
                }
                placeholder='Enter your password'
                required
              />
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
                onClick={() =>
                  setLoginInput({
                    email: 'rohan@gmail.com',
                    password: '1234abcd',
                  })
                }
                className='bg-primary outline-primary text-white p-3 sm:p-2 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline active:bg-blue-500
                                shadow-lg'
              >
                Log In With Test Credentials
              </button>
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
