import { Route, Routes } from 'react-router-dom';
import { PublicHeader } from '../components/PublicHeader/PublicHeader';
import { PublicHome } from '../pages/PublicHome/PublicHome';
import { Login } from '../pages/Login/Login';
import { Register } from '../pages/Register/Register';

export const Public = () => {
  return (
    <div>
      <PublicHeader />
      <div>
        <div className='container'>
          <Routes>
            <Route
              index
              path='/'
              element={<PublicHome />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='*'
              element={<h1 className='text-danger'>Page Not Found!!!</h1>}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
};
