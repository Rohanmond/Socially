import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userUpdateHandler } from '../../../Authentication/authenticationSlice';
import { followUser } from '../../UserSlice';
import './FollowChip.css';

export const FollowChip = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((store) => store.authentication);
  return (
    <div className='h-48 follow-container-width bg-nav-background rounded-lg flex flex-col gap-4 items-center justify-center'>
      <div className=''>
        <img
          onClick={() => navigate(`/profile/${user?.userHandler}`)}
          title={`${user.firstName} ${user.lastName}`}
          className='cursor-pointer h-20 w-20 object-cover rounded-full'
          src={user.pic}
          alt={user.userHandler}
        />
      </div>
      <button
        onClick={() =>
          dispatch(
            followUser({
              followUserId: user._id,
              token,
              dispatch,
              userUpdateHandler,
            })
          )
        }
        className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-1 text-center'
      >
        Follow
      </button>
    </div>
  );
};
