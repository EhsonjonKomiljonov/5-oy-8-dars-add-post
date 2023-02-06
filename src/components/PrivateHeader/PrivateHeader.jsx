import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';

export const PrivateHeader = () => {
  const { user, setUser } = useContext(UserContext);
  const { setToken } = useContext(AuthContext);

  return (
    <header className='bg-dark py-3'>
      <div className='container'>
        <div className='d-flex align-items-center'>
          <Link
            className='fs-4 text-decoration-none text-white'
            to='/'
          >
            LOGO
          </Link>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'ms-3 text-white'
                : 'ms-3 text-white text-decoration-none'
            }
            to='/posts'
          >
            Posts
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              isActive
                ? 'ms-3 text-white'
                : 'ms-3 text-white text-decoration-none'
            }
            to='/users'
          >
            Users
          </NavLink>

          <button
            onClick={() => {
              setToken('');
              setUser('');
            }}
            className='ms-auto btn btn-warning rounded-circle px-2 py-2'
          >
            {user.first_name.at(0) + '.' + user.last_name.at(0)}
          </button>
        </div>
      </div>
    </header>
  );
};
