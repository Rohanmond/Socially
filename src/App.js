import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { MockAPI, PrivateRoute } from './components';
import {
  Login,
  PostFeedPage,
  PostIndividualPage,
  Profile,
  Signup,
} from './features';
import { EditPostModal } from './features/PostFeedPage/components/EditPostModal';

function App() {
  const { theme } = useSelector((store) => store.theme);
  const { openModal, postData } = useSelector(
    (store) => store.toggleEditPostModal
  );

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div
        data-theme={theme}
        className={` min-h-screen  bg-background dark:bg-dark-background`}
      >
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
        {openModal ? <EditPostModal postData={postData} /> : null}

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
          <Route
            path='/post/:postId'
            element={
              <PrivateRoute>
                <PostIndividualPage />
              </PrivateRoute>
            }
          />
          <Route
            path='/explore'
            element={
              <PrivateRoute>
                <PostFeedPage />
              </PrivateRoute>
            }
          />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/mockman' element={<MockAPI />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
