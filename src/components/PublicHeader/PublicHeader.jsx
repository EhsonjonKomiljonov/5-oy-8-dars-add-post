import { Link } from 'react-router-dom';

export const PublicHeader = () => {
  return (
    <header className='bg-dark py-3'>
      <div className='container'>
        <div className='d-flex aluign-items-center'>
          <Link
            className='fs-4 text-decoration-none text-white'
            to='/'
          >
            LOGO
          </Link>

          <Link
            className='ms-auto btn btn-outline-primary'
            to='/login'
          >
            Sign In
          </Link>
          <Link
            className='ms-3 btn btn-outline-success'
            to='/register'
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
};
