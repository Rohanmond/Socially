export const Nav = () => {
  return (
    <nav className='w-full sticky top-0 min h-20 left-0 right-0 leading-10 z-50 bg-nav-background'>
      <div className='flex justify-between relative items-center px-4 h-full'>
        <div className='flex gap-2 items-center cursor-pointer'>
          <img
            className='h-12 max-w-full align-middle'
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650084912/logo_tzzpf3.png'
            alt=''
          />
          <span className='text-3xl'>Socially</span>
        </div>
        <div className='px-4'>
          <form className='relative w-96 flex'>
            <input
              className='focus:ring-indigo-500 focus:border-indigo-500 py-1 px-4 rounded-lg  w-full h-10 bg-secondary-background text-sm'
              type='text'
              placeholder='search here...'
            />
            {/* <i className='ri-search-line'></i> */}
          </form>
        </div>
        <ul className='text-primary flex items-center gap-4 text-2xl'>
          <li title='follow' className='cursor-pointer'>
            <i class='ri-heart-line'></i>
          </li>
          <li title='bookmark' className='cursor-pointer'>
            <i class='ri-bookmark-line'></i>
          </li>
          <li className='cursor-pointer'>
            <img
              className='w-14 h-14 rounded-full'
              src='https://res.cloudinary.com/donqbxlnc/image/upload/v1650096757/1_vztwsr.jpg'
              alt=''
            />
          </li>
        </ul>
      </div>
    </nav>
  );
};
