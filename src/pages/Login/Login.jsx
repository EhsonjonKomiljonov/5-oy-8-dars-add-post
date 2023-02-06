import { useRef } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const navigate = useNavigate();

  const { setToken } = useContext(AuthContext);
  const { setUser } = useContext(UserContext);

  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .post('http://localhost:8080/login', {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      })
      .then((data) => {
        if (data.status === 200) {
          setToken(data.data.accessToken);
          setUser(data.data.user);
          navigate('/');
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className='w-50 mx-auto p-5 shadow mt-5'>
      <h2 className='h1 text-center mb-4'>Login</h2>
      <form
        onSubmit={handleSubmit}
        className='mx-auto'
      >
        <input
          ref={emailRef}
          className='form-control'
          type='email'
          placeholder='Email'
        />
        <input
          ref={passwordRef}
          className='form-control my-3'
          type='password'
          placeholder='Password'
        />
        <button className='btn btn-primary'>SEND</button>
      </form>
    </div>
  );
};
