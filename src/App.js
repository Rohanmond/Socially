import { Route, Routes } from 'react-router-dom';
import './App.css';
import { MockAPI, PrivateRoute } from './components';

import { Login, PostFeedPage, Profile, Signup } from './pages';

function App() {
  return (
    <div className='min-h-screen bg-background'>
      <Routes>
        <Route
          path='/'
          element={
            <PrivateRoute>
              <PostFeedPage />
            </PrivateRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/mockman' element={<MockAPI />} />
      </Routes>
    </div>
  );
}

export default App;
