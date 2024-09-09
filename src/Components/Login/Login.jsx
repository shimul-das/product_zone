
import React, { useContext, useState } from 'react';
import "./login.css";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../Providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(null);
  const { login} = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";

  const handleSignIn = async (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    
    try {
      await login(email, password); // Call login from AuthProvider
      form.reset();
      
      // Show success SweetAlert
      Swal.fire({
        title: 'Login Successful!',
        text: 'You have successfully logged in.',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        // After the alert is confirmed, navigate to the intended page
        navigate(from, { replace: true });
      });
  
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className='form-container'>
      <h2 className='form-title'>Login</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-control">
          <label htmlFor="">Email</label>
          <input type="email" name='email' required />
        </div>
        <div className="form-control">
          <label htmlFor="">Password</label>
          <input type={show ? "text" : "password"} name='password' required />
          <p onClick={() => setShow(!show)}><small>
            {
              show ? <span>Hide password</span> : <span>Show password</span>
            }
          </small></p>
        </div>

        <div className="form-control">
          <input className='btn-submit' type="submit" value="Login" name='submit' required />
        </div>
        <p className='text-error'>{error}</p>
      </form>
    </div>
  );
};

export default Login;
