import React, { useEffect, useState, useCallback } from 'react';
import './SignUpPage.css';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';
import imageLogo from '../../assets/images/logo-login.png';
import imageLogin from '../../assets/images/background-login2.png';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService';
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const mutation = useMutationHooks((data) => UserService.signupUser(data));
  const { data, isPending, isSuccess, isError } = mutation;

  const handleNavigateSignIn = useCallback(() => {
    navigate('/sign-in');
  }, [navigate]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleNavigateSignIn();
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError, handleNavigateSignIn]);

  const handleOnChangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnChangePassword = (value) => {
    setPassword(value);
  };

  const handleOnChangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
  };

  return (
    <div
      className="signup-page"
      style={{
        backgroundImage: `url(${imageLogin})`,
      }}
    >
      <div className="signup-container">
        <div className="container-left">
          <h1>Welcome to TVT Store</h1>
          <p>Create Account</p>
          <InputForm
            style={{ marginBottom: '10px' }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnChangeEmail}
          />
          <div style={{ position: 'relative', marginBottom: '10px' }}>
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
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer',
              }}
              onClick={toggleConfirmPasswordVisibility}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="Confirm Password"
              type={isShowConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={handleOnChangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{ color: 'red' }}>{data?.message}</span>}
          <Loading isPending={isPending}>
            <ButtonComponent
              disabled={!email.length || !password.length || !confirmPassword.length}
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: 'rgb(255, 57, 69)',
                height: '48px',
                width: '100%',
                border: 'none',
                borderRadius: '4px',
                margin: '26px 0 10px',
              }}
              textButton={'Register'}
              styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
            />
          </Loading>
          <p>
            Do you have an Account?{' '}
            <span className="text-light" onClick={handleNavigateSignIn}>
              Login
            </span>
          </p>
        </div>
        <div className="container-right">
          <Image
            style={{ borderTopRightRadius: '40px', borderBottomRightRadius: '40px' }}
            src={imageLogo}
            preview={false}
            alt="image-logo"
            height="445px"
            width="300px"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
