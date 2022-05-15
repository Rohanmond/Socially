import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useOutsideClickHandler } from '../../custom-hooks';
import { searchFunc } from '../../utils/searchUtils';
import { darkThemeHandler, lightThemeHandler } from './ThemeSlice';

export const Nav = () => {
  const navigate = useNavigate();
  const { theme } = useSelector((store) => store.theme);
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef();
  let timerId = useRef();
  const [searchInput, setSearchInput] = useState('');
  const [searchedData, setSearchData] = useState([]);
  const { resetMenu } = useOutsideClickHandler(searchRef);
  const { user } = useSelector((store) => store.authentication);
  const { allUsers } = useSelector((store) => store.users);

  useEffect(() => {
    clearTimeout(timerId.current);
    timerId.current = setTimeout(() => {
      setSearchData(searchFunc(allUsers, searchInput));
    }, 500);
  }, [searchInput]);

  useEffect(() => {
    if (resetMenu) {
      setShowSearch(false);
      setSearchInput('');
      setSearchData([]);
    }
  }, [resetMenu]);

  return (
    <nav className='w-full sticky top-0 min h-20 sm:h-18 left-0 right-0 leading-10 z-50 dark:bg-dark-nav-background drop-shadow-xl bg-nav-background shadow'>
      <div className='flex justify-between relative items-center p-4 sm:p-2  h-full'>
        <div
          onClick={() => navigate('/')}
          className='flex gap-2 items-center cursor-pointer'
        >
          <img
            className='h-12 sm:h-10 max-w-full align-middle'
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650084912/logo_tzzpf3.png'
            alt='hero'
          />
          <span className='text-3xl dark:text-dark-txt-color sm:hidden'>
            Socially
          </span>
        </div>

        <ul className='text-primary flex items-center gap-4 text-2xl'>
          <li
            title='search'
            onClick={() => setShowSearch(true)}
            className='cursor-pointer flex items-center'
          >
            <i className='ri-search-line'></i>
          </li>
          {theme === 'dark' ? (
            <li
              title='theme'
              onClick={() => dispatch(lightThemeHandler())}
              className='cursor-pointer flex items-center'
            >
              <i className='ri-sun-line'></i>
            </li>
          ) : (
            <li
              title='theme'
              onClick={() => dispatch(darkThemeHandler())}
              className='cursor-pointer flex items-center'
            >
              <i className='far fa-moon'></i>
            </li>
          )}
          <li
            title='explore'
            onClick={() => navigate('/explore')}
            className='cursor-pointer flex items-center'
          >
            <i className='ri-compass-3-line'></i>
          </li>
          <li
            title='feed'
            onClick={() => navigate('/')}
            className='cursor-pointer flex items-center'
          >
            <i className='ri-home-8-line'></i>
          </li>

          <li className='cursor-pointer'>
            <img
              onClick={() => navigate(`/profile/${user.userHandler}`)}
              className='w-10 h-10 object-cover rounded-full'
              src={user?.pic}
              alt='profile'
            />
          </li>
        </ul>
      </div>
      {showSearch ? (
        <div className='absolute top-0 w-screen h-screen flex  justify-center bg-background-dim'>
          <i
            onClick={() => {
              setShowSearch(false);
              setSearchData([]);
              setSearchInput('');
            }}
            className='absolute right-2 sm:mt-24 mt-6 text-dark-txt-color fas fa-times-circle text-3xl'
          ></i>
          <div
            ref={searchRef}
            className='sm:w-9/12 w-2/5 mt-6 sm:mt-24 flex flex-col gap-5 items-center'
          >
            <input
              value={searchInput}
              className='w-full bg-background dark:bg-dark-background text-dark-txt-secondary-color rounded-lg focus:outline-none px-4'
              type='text'
              onChange={(e) => setSearchInput(e.target.value)}
            />

            <div className='flex w-full flex-col gap-4   max-h-96 z-50 overflow-y-auto rounded-lg   bg-background dark:bg-dark-background'>
              {searchInput !== '' && searchedData.length === 0 ? (
                <p className='text-center text-lg m-1 font-medium text-txt-secondary-color dark:text-dark-txt-color'>
                  No user to show
                </p>
              ) : (
                searchedData.map((user) => {
                  return (
                    <div
                      key={user._id}
                      onClick={() => {
                        navigate(`/profile/${user.userHandler}`);
                        setShowSearch(false);
                      }}
                      className='px-4 pt-3 last-of-type:pb-3 cursor-pointer  flex justify-between items-center'
                    >
                      <img
                        className='w-20 sm:w-16 sm:h-16 h-20 object-cover rounded-full'
                        src={user.pic}
                        alt='user pic'
                      />
                      <p className='font-medium text-lg text-txt-secondary-color dark:text-dark-txt-secondary-color'>
                        {user.firstName} {user.lastName}
                      </p>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};
