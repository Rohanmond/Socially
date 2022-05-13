import './FollowChip.css';

export const FollowChip = ({ user }) => {
  return (
    <div className='h-48 follow-container-width bg-yellow-400 rounded-lg flex flex-col gap-4 items-center justify-center'>
      <div className=''>
        <img
          title={`${user.firstName} ${user.lastName}`}
          className='cursor-pointer h-20 w-20 object-cover rounded-full'
          src={user.pic}
          alt={user.userHandler}
        />
      </div>
      <button className='text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-1 text-center'>
        Follow
      </button>
    </div>
  );
};
