import React, { useState, useRef, useEffect } from 'react';
import './css/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import { userSignInAction } from './redux/actions/userAction';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import { toast } from 'react-toastify'
import '@fortawesome/fontawesome-free/css/all.css';


const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const { isAuthenticated, userInfo } = useSelector(state => state.signIn);

  useEffect(() => {
    if (isAuthenticated) {
      if (userInfo.role === 1) {
        navigate('/');
      } else if (userInfo.role === 0) {
        navigate('/');
      }
    }
  }, [isAuthenticated, userInfo]);

  const [selectedRole, setSelectedRole] = useState('0');
  const [isSignUp, setIsSignUp] = useState(false);
  const firstnameRef = useRef(null);
  const lastnameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const logpassRef = useRef(null);
  const logemailRef = useRef(null);
  const otpRef = useRef(null);

  const toggleFormMode = () => {
    setIsSignUp(!isSignUp);
  };

  const handleotp = async () => {
    if (
      firstnameRef.current.value === '' ||
      lastnameRef.current.value === '' ||
      emailRef.current.value === '' ||
      passwordRef.current.value === ''
    ) {
      toast.error("All Fields are Required");
      return;
    }
    const otpdata = {
      email: emailRef.current.value,
    };
    try {
      const response = await fetch('http://localhost:9000/api/sendotp', {
        method: 'POST',
        body: JSON.stringify(otpdata),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (data.success) {
        toast.success("Otp sent Successfully");
      } else if (data.message === 'exist') {
        toast.error("Email Already registered");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignIn = async () => {
    if (logemailRef.current.value === '' || logpassRef.current.value === '') {
      toast.error("All Fields are Required");
      return;
    }
    const signInData = {
      email: logemailRef.current.value,
      password: logpassRef.current.value,
    };
    try {
      dispatch(userSignInAction(signInData));

    } catch (error) {
      console.log('problem');
    }
  };

  const handleSignUp = async () => {
    if (
      firstnameRef.current.value === '' ||
      lastnameRef.current.value === '' ||
      emailRef.current.value === '' ||
      passwordRef.current.value === '' ||
      otpRef.current.value === ''
    ) {
      toast.error("All Fields are Required");
      return;
    }
    const signUpData = {
      firstName: firstnameRef.current.value,
      lastName: lastnameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      otp: otpRef.current.value,
      role: selectedRole
    };

    try {
      const response = await fetch('http://localhost:9000/api/signup', {
        method: 'POST',
        body: JSON.stringify(signUpData),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.success) {
        toast.success("Signed up successfully");
        toggleFormMode();
        firstnameRef.current.value = '';
        lastnameRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        otpRef.current.value = '';
      } else if (data.message === 'not') {
        alert('OTP NOT VALID');
        firstnameRef.current.value = '';
        lastnameRef.current.value = '';
        emailRef.current.value = '';
        otpRef.current.value = '';
        passwordRef.current.value = '';
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`container ${isSignUp ? 'sign-up-mode' : ''}`}>
      <Navbar />
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className={`sign-in-form ${isSignUp ? 'hidden' : ''}`}>
            <h2 className="title">Sign in</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Email" ref={logemailRef} />
            </div>
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type={showPassword ? 'text' : 'password'} placeholder="Password" ref={logpassRef} style={{
                  width: 'calc(100% - 2.5em)', 
                  paddingRight: '2.5em',
                }}/>
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`}
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1em', // Adjust as needed for spacing
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              ></i>
            </div>
            <input
              type="submit"
              value="Login"
              className="btn solid"
              onClick={(e) => {
                e.preventDefault();
                handleSignIn();
              }}
            />
          </form>
          <form action="#" className={`sign-up-form ${isSignUp ? '' : 'hidden'}`}>
            <h2 className="title">Sign up</h2>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="firstname" ref={firstnameRef} />
            </div>
            <div className="input-field">
              <i className="fas fa-user"></i>
              <input type="text" placeholder="lastname" ref={lastnameRef} />
            </div>
            <div className="input-field">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" ref={emailRef} />
            </div>
            <div className="input-field" >
              <i className="fas fa-lock"></i>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                ref={passwordRef}
                style={{
                  width: 'calc(100% - 2.5em)', // Adjust as needed
                  paddingRight: '2.5em', // Space for the eye icon
                }}
              />
              <i
                className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'} eye-icon`}
                onClick={togglePasswordVisibility}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '1em', // Adjust as needed for spacing
                  transform: 'translateY(-50%)',
                  cursor: 'pointer',
                }}
              ></i>
            </div>

            <select
              style={{
                padding: '11px',
                fontSize: '1.1rem',
                borderRadius: '28px',
                border: '#f0f0f0',
                width: '380px',
                height: '55px',
                textAlign: 'center',
                background: '#f0f0f0',
                color: '#444',
                fontWeight: '600'
                // Add more styles as needed
              }}
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
            >
              <option value="0" >User</option>
              <option value="1">Doctor</option>
            </select>

            <input
              type="submit"
              className="btn"
              value="Send Otp"
              onClick={(e) => {
                e.preventDefault();
                handleotp();
              }}
            />
            <div className="input-field">
              <i className="fas fa-lock"></i>
              <input type="text" placeholder="Otp" ref={otpRef} />
            </div>
            <input
              type="submit"
              className="btn"
              value="Sign up"
              onClick={(e) => {
                e.preventDefault();
                handleSignUp();
              }}
            />
          </form>
        </div>
      </div>

      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here ?</h3>
            <p>
              If you don't have an account yet, sign up to stay informed about top-notch job prospects
            </p>
            <button className="btn transparent" onClick={toggleFormMode}>
              Sign up
            </button>
          </div>
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us ?</h3>
            <p>
              Please log in now to access exclusive job opportunities from across the globe and unlock the best career options available.
            </p>
            <button className="btn transparent" onClick={toggleFormMode}>
              LogIn
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
