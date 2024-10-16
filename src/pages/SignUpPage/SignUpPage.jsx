import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';  
import imageLogo from '../../assets/images/logo-login.png';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import * as message from '../../components/Message/Message'


const SignUpPage = () => {
  const navigate = useNavigate()
  const [isShowPassword, setIsShowPassword] = useState(false);  
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const mutation = useMutationHooks(
    data => UserService.signupUser(data) 
  )
  const {data, isPending, isSuccess, isError } = mutation

  useEffect(() =>{
    if(isSuccess){
      message.success()
      handleNavigateSignIn()
    }else if(isError){
      message.error()
    }
  },[isSuccess, isError])

  const handleOnChangeEmail = (value) =>{
    setEmail(value)
  }

  const handleOnChangePassword = (value) =>{
    setPassword(value)
  }

  const handleOnChangeConfirmPassword = (value) =>{
    setConfirmPassword(value)
  }

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);  
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);  
  };

  const handleNavigateSignIn = () =>{
    navigate('/sign-in')
  }

  const handleSignUp = () =>{
    mutation.mutate({email, password, confirmPassword})
    
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Hello</h1>
          <p>Dang nhap va tao tai khoan</p>
          <InputForm style={{ marginBottom: '10px' }} 
          placeholder="abc@gmail.com" 
          value={email} onChange={handleOnChangeEmail} />

          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span 
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer'
              }}
              onClick={togglePasswordVisibility}  
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm 
              placeholder="Password" 
              type={isShowPassword ? "text" : "password"} 
              value={password} onChange={handleOnChangePassword}
            />
          </div>

          
          <div style={{ position: 'relative', marginBottom: '10px' }}>
            <span 
              style={{
                zIndex: 10,
                position: 'absolute',
                top: '4px',
                right: '8px',
                cursor: 'pointer'
              }}
              onClick={toggleConfirmPasswordVisibility}  
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm 
              placeholder="Confirm Password" 
              type={isShowConfirmPassword ? "text" : "password"} 
              value={confirmPassword} onChange={handleOnChangeConfirmPassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
          <Loading isPending={isPending}>
          <ButtonComponent
            disabled={!email.length || !password.length || !confirmPassword.length }
            onClick={handleSignUp}
            
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textButton={'Dang ky'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
          ></ButtonComponent>
            </Loading>
          <p>Ban da co Tai khoan ? <WrapperTextLight onClick={handleNavigateSignIn}>Dang nhap</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height='445px' width='300px' />
          
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage
