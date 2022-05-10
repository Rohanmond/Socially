import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useOutsideClickHandler } from '../../../custom-hooks';

export const ProfileModal = ({ setShowProfileModal }) => {
  const { user } = useSelector((store) => store.authentication);
  const ref = useRef();
  const { resetMenu } = useOutsideClickHandler(ref);

  useEffect(() => {
    if (resetMenu) {
      setShowProfileModal(false);
    }
  }, [resetMenu]);

  return (
    <div className='h-screen w-screen fixed flex justify-center items-center z-50 bg-background-dim'>
      <div
        ref={ref}
        className='flex flex-col gap-4 p-5 rounded-xl  sm:w-9/12 w-1/3 bg-background'
      >
        {/* <div onClick={() => setShowProfileModal(false)}>
          <i className='text-2xl fas fa-angle-left cursor-pointer' />
        </div> */}
        <div className='flex flex-col gap-4'>
          <div className='flex gap-4'>
            <p className='text-xl font-semibold text-txt-secondary-color'>
              Avatar{' '}
            </p>
            <div className='w-12 relative'>
              <img
                src={user?.pic}
                className='rounded-full object-cover'
                alt='user pic'
              />
              <div className='cursor-pointer'>
                <i className='fas fa-camera rounded-full absolute left-0 top-8' />
                <input
                  className='absolute left-0 right-8 top-8 opacity-0'
                  accept='image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/jpg,image/webp'
                  type='file'
                  // onChange={(e) => updateImageHandler(e.target.files[0])}
                ></input>
              </div>
            </div>
          </div>

          <div className='flex justify-between gap-4'>
            <p className='text-lg text-txt-secondary-color font-semibold'>
              Bio{' '}
            </p>
            <textarea
              className='px-2 focus:outline-none'
              value={user?.bio}
              // onChange={(e) =>
              //   setUserForm({ ...userForm, bio: e.target.value })
              // }
            />
          </div>
        </div>
        <div className='flex justify-end'>
          <button
            className='rounded-lg px-2 py-1 bg-blue-500 text-white font-bold hover:bg-blue-400'
            // onClick={() => updateHandler()}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};
