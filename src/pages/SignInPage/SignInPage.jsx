import React, { useEffect, useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';  
import imageLogo from '../../assets/images/logo-login.png';
import imageLogin from '../../assets/images/background-login2.png';
import { useNavigate } from 'react-router-dom';
import * as UserService from '../../services/UserService'
import { useMutationHooks } from '../../hooks/useMutationHook';
import Loading from '../../components/LoadingComponent/Loading';
import { jwtDecode } from "jwt-decode";
import { useDispatch } from 'react-redux'
import { updateUser } from '../../redux/slides/userSlide';

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const mutation = useMutationHooks(
    data => UserService.loginUser(data)
  )
  const {data, isPending, isSuccess} = mutation

  useEffect(() =>{
    if(isSuccess){
      navigate('/')
      localStorage.setItem('access_token',JSON.stringify( data?.access_token))
      if(data?.access_token) {
        const decoded = jwtDecode(data?.access_token)
        console.log("decode", decoded)
        if(decoded?.id){
          handleGetDetailsUser(decoded?.id , data?.access_token)
        }
      }
    }
  }, [isSuccess])

  const handleGetDetailsUser = async (id, token ) =>{
    const res = await UserService.getDetailsUser(id , token)
    dispatch(updateUser({...res?.data, access_token: token}))
    console.log("res" , res)
  }

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);  
  };

  const handleNavigateSignUp = () =>{
    navigate('/sign-up')
  }

  const handleOnChangeEmail = (value) =>{
      setEmail(value)
    }

    const handleOnChangePassword = (value) =>{
      setPassword(value)
    }

    const handleSignIn = () =>{
      mutation.mutate({
        email,
        password
      })
      console.log("sign-in", email, password)
    }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh',
      backgroundImage: `url(${imageLogin})`,  
    backgroundSize: 'cover',              
    backgroundPosition: 'center',          
    backgroundRepeat: 'no-repeat',
     }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '40px', background: '#fff', display: 'flex',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 1)' }}>
        <WrapperContainerLeft>
          <h1>Welcome to TVT Store</h1>
          <p>Login and create Account</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" 
          value={email} onChange={handleOnChangeEmail} />
          
          <div style={{ position: 'relative' }}>
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
            <InputForm placeholder="Password" type={isShowPassword ? "text" : "password"} 
            value={password} onChange={handleOnChangePassword}
            />
          </div>
          {data?.status === 'ERR' && <span style={{color: 'red'}}>{data.message}</span>}  
          <Loading isPending={isPending}>  
          <ButtonComponent
            disabled={!email.length || !password.length }
            onClick={handleSignIn}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textButton={'Login'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
          ></ButtonComponent>
          </Loading>
          <p><WrapperTextLight>Forgot Password?</WrapperTextLight></p>
          <p>Don't have an Account?<WrapperTextLight onClick={handleNavigateSignUp}>Create your account?</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight style={{borderRadius: '40px'}}>
          <Image style={{borderTopRightRadius: '40px', borderBottomRightRadius: '40px'}}
           src={imageLogo} preview={false} alt="image-logo" height='445px' width='300px' />
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage
