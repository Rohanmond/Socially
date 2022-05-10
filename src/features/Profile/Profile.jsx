import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav } from '../../components';
import { logoutHandler } from '../Authentication/authenticationSlice';
import { ProfileModal } from './ProfileModal/ProfileModal';

export const Profile = () => {
  const dispatch = useDispatch();
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user } = useSelector((store) => store.authentication);

  return (
    <>
      {showProfileModal ? (
        <ProfileModal setShowProfileModal={setShowProfileModal} />
      ) : null}
      <Nav />
      <main className='p-4'>
        {/*divider */}
        <div className='flex justify-center'>
          {/* profile container */}
          <div className='flex flex-col w-3/5 md:w-4/5 sm:w-full  gap-4 '>
            {/* profile */}
            <div className='flex justify-evenly items-center  bg-nav-background gap-10 rounded-lg drop-shadow-2xl  p-5'>
              <img
                className='h-40 w-40 sm:h-24 sm:w-24 rounded-full'
                src={user?.pic}
                alt='profile'
              />

              <div className=' flex flex-col justify-center items-center gap-4 sm:gap-2'>
                <div className='flex  items-center gap-2'>
                  <p className='text-3xl  sm:text-xl text-center'>
                    {user?.firstName} {user?.lastName}
                  </p>
                  <button
                    onClick={() => setShowProfileModal(true)}
                    className='py-1 px-2 ring-1 rounded-md hover:bg-secondary-background text-sm'
                  >
                    Edit profile
                  </button>
                </div>
                <div className='flex gap-1 text-sm sm:text-xs'>
                  <p>@{user?.username}</p>
                </div>
                <div className='flex gap-2 text-sm sm:text-xs'>
                  <p>
                    <span>{user?.bio}</span>
                  </p>
                </div>
                <div className='flex gap-2   text-sm sm:text-xs'>
                  <p>0 posts</p>
                  <p>230 followers</p>
                  <p>658 following</p>
                </div>
                <button
                  onClick={() => dispatch(logoutHandler())}
                  className='text-white text-base  sm:text-xs bg-red-500 py-1 px-3 rounded-md active:bg-red-600'
                >
                  Logout
                </button>
              </div>
            </div>

            <div className='flex justify-evenly items-center  bg-nav-background gap-10 rounded-lg drop-shadow-2xl  p-4 sm:p-3 sm:text-sm'>
              <div className='cursor-pointer flex gap-1 text-primary'>
                <i className='ri-home-heart-line'></i>
                <p>POSTS</p>
              </div>
              <div className='cursor-pointer flex gap-1'>
                <i className='ri-bookmark-3-line'></i>
                <p>SAVED</p>
              </div>
              <div className='cursor-pointer flex gap-1'>
                <i className='ri-heart-2-line'></i>
                <p>FOLLOWERS</p>
              </div>
            </div>
            {/**Post-feed */}
            <div className='flex flex-col gap-4 bg-nav-background rounded-lg drop-shadow-2xl p-5'>
              {/** post header */}
              <div className='flex gap-4  flex-grow'>
                <img
                  className='rounded-full h-12 w-12'
                  src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650191393/01_jxbjlo.jpg'
                  alt='post-header'
                />
                <div className='flex justify-between flex-grow'>
                  <div className='flex flex-col'>
                    <p className='text-xl'>Anna Sthesia</p>
                    <p className='text-xs text-txt-secondary-color'>
                      July 26 2018, 01:03pm
                    </p>
                  </div>
                  <i className='ri-more-fill text-xl cursor-pointer'></i>
                </div>
              </div>
              {/**Post details */}
              <div className='flex flex-col gap-2 flex-grow'>
                <p>
                  Yesterday with @Karen Miller and @Marvin Stemperd at the
                  #Rock'n'Rolla concert in LA. Was totally fantastic! People
                  were really excited about this one!
                </p>
                <img
                  className='rounded-lg'
                  src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650194819/1_erzjab.jpg'
                  alt='post-details'
                />
              </div>
              {/**Post footer */}
              <div className='flex gap-4 flex-grow py-1  items-center justify-evenly font-normal text-txt-secondary-color'>
                <div className='flex items-center  cursor-pointer gap-1'>
                  <i className='ri-heart-line'></i>
                  <span>140 likes</span>
                </div>
                <div className='flex items-center cursor-pointer gap-1'>
                  <i className='ri-chat-1-line'></i>
                  <span>comments</span>
                </div>
                <div className='flex items-center cursor-pointer gap-1'>
                  <i className='ri-share-line'></i>
                  <span>Share</span>
                </div>
              </div>
              {/**Post comment section */}
              <div className='flex gap-3 flex-col border-t-2  pt-6'>
                {/**Comment different person */}
                <div className='flex gap-4'>
                  <img
                    className='rounded-full w-9 h-9 mt-1'
                    src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650205531/02_zqttxd.jpg'
                    alt='profile-comment'
                  />
                  <div>
                    <p className='font-normal'>Monty Carlo</p>
                    <p className='font-light text-txt-secondary-color'>
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className='flex gap-3'>
                      <p className='font-light text-primary cursor-pointer'>
                        Like
                      </p>
                      <p className='font-light text-primary cursor-pointer'>
                        Reply
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex gap-4'>
                  <img
                    className='rounded-full w-9 h-9 mt-1'
                    src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650096757/1_vztwsr.jpg'
                    alt='profile-comment'
                  />
                  <div>
                    <p className='font-normal'>Monty Carlo</p>
                    <p className='font-light text-txt-secondary-color'>
                      Lorem ipsum dolor sit amet
                    </p>
                    <div className='flex gap-3'>
                      <p className='font-light text-primary cursor-pointer'>
                        Like
                      </p>
                      <p className='font-light text-primary cursor-pointer'>
                        Reply
                      </p>
                    </div>
                  </div>
                </div>

                <div className='flex gap-4 flex-grow pl-12'>
                  <img
                    className='rounded-full w-9 h-9 mt-1'
                    src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650191393/01_jxbjlo.jpg'
                    alt='profile-comment'
                  />
                  <div>
                    <p className='font-normal'>Monty Carlo</p>
                    <p className='font-light text-txt-secondary-color'>
                      Thank you for your reply!
                    </p>
                    <p className='font-light text-primary cursor-pointer'>
                      Like
                    </p>
                  </div>
                </div>

                <div>
                  <input
                    placeholder='Enter your comment'
                    className='mt-3
                      block
                      w-full
                      rounded-sm
                      border-txt-hover-color
                      p-2 px-3
                      border
                      shadow-sm
                      focus:border-primary'
                    type='text'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};
