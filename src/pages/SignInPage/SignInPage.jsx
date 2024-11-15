import React, { useEffect, useState } from 'react';
import './SignInPage.css'; 
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { notification } from 'antd'; 
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import imageLogin from '../../assets/images/background-login2.png';
import { useLocation, useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { updateUser } from '../../redux/slices/userSlice';
import { GoogleLogin } from '@react-oauth/google';
import { loadCartForUser } from '../../redux/slices/orderSlice';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isPending, isSuccess } = mutation;

  useEffect(() => {
    const handleGetDetailsUser = async (id, token) => {
      const res = await UserService.getDetailsUser(id, token);
      dispatch(updateUser({ ...res?.data, access_token: token }));
  
      // Load cart for logged in user from localStorage
      const userCart = JSON.parse(localStorage.getItem(`cart_${id}`)) || [];
      dispatch(loadCartForUser({ user: id, orderItems: userCart }));
    };
  
    if (isSuccess) {
      if (location?.state) {
        navigate(location?.state);
      } else {
        navigate('/');
      }
  
      localStorage.setItem('access_token', JSON.stringify(data?.access_token));
      if (data?.access_token) {
        const decoded = jwtDecode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailsUser(decoded?.id, data?.access_token);
        }
      }
    } 
  }, [isSuccess, navigate, data?.access_token, dispatch, location?.state]);
  
  

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const handleNavigateSignUp = () => {
    navigate('/sign-up');
  };

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    setErrorMessage(''); 
    mutation.mutate({
      email,
      password,
    });
  };

  useEffect(() => {
    if (data?.status === 'ERR') {
      navigate('/sign-in');
      notification.error({
        message: 'Login Failed',
        description: data?.message || 'Login failed. Please try again.',
        placement: 'bottomRight',
      });
    }else if (data?.status === 'Ok'){
      notification.success({
        message: 'Login Success',
        description: data?.message || 'Login successful.',
        placement: 'bottomRight',
      });
    }
  }, [data?.status, navigate,data?.message]);

  const handleGoogleLoginSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const data = await UserService.loginGGUser({ token: googleToken });
      
      if (data && data.user && data.access_token) {
        dispatch(updateUser(data.user));
        localStorage.setItem('access_token', JSON.stringify(data.access_token));

        const userCart = JSON.parse(localStorage.getItem(`cart_${data.user._id}`)) || [];
        dispatch(loadCartForUser({ user: data.user.id, orderItems: userCart }));
        
        notification.success({
          message: 'Login Success',
          description: 'Successfully logged in with Google',
        });
        
        navigate('/');
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } else {
        throw new Error("User data or access token is missing");
      }
    } catch (error) {
      console.error("Google login error:", error);
      notification.error({
        message: 'Login Failed',
        description: 'Google Sign In Failed',
      });
    }
  };
 
  const handleGoogleLoginFailure = () => {
    notification.error({
      message: 'Login Failed',
      description: 'Google Sign In Failed',
    });
  };

  return (
    <div
      className="login-page"
      style={{
        backgroundImage: `url(${imageLogin})`,
      }}
    >
      <div className="login-container">
        <div className="container-left">
          <h1>Welcome to TVT Store</h1>
          <p>Login and create Account</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: 'relative' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer',
              }}
              onClick={togglePasswordVisibility}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Password"
              type={isShowPassword ? 'text' : 'password'}
              value={password}
              onChange={handleOnChangePassword}
            />
          </div>

          {errorMessage && <span style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</span>}

          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textButton={'Login'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
            />
          </Loading>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
          />
          <p>
            Don't have an Account?{' '}
            <span className="text-light" onClick={handleNavigateSignUp}>
              Create your account?
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
