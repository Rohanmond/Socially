import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import { MockAPI } from './components';

import { Login, PostFeedPage, Profile, Signup } from './pages';

function App() {
  return (
    <div className='min-h-screen bg-background'>
      <Routes>
        <Route path='/' element={<PostFeedPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
