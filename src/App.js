import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { MockAPI, PrivateRoute } from './components';
import { Login, PostFeedPage, Profile, Signup } from './features';

function App() {
  return (
    <div className='min-h-screen bg-background'>
      <ToastContainer
        position='bottom-right'
        autoClose={false}
        newestOnTop={false}
        closeOnClick
        theme='colored'
        rtl={false}
        pauseOnFocusLoss
        draggable
      />
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
          path='/profile/:userHandler'
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
