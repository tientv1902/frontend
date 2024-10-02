import React, { useState } from 'react';
import { WrapperContainerLeft, WrapperContainerRight, WrapperTextLight } from './style';
import InputForm from '../../components/InputForm/InputForm';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { Image } from 'antd';
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons';  
import imageLogo from '../../assets/images/logo-login.png';

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);  
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);  

  const togglePasswordVisibility = () => {
    setIsShowPassword(!isShowPassword);  
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsShowConfirmPassword(!isShowConfirmPassword);  
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgb(0, 0, 0, 0.53)', height: '100vh' }}>
      <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
        <WrapperContainerLeft>
          <h1>Hello</h1>
          <p>Dang nhap va tao tai khoan</p>
          <InputForm style={{ marginBottom: '10px' }} placeholder="abc@gmail.com" />

        
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
            />
          </div>

          <ButtonComponent
            bordered={false}
            size={40}
            styleButton={{
              background: 'rgb(255, 57, 69)',
              height: '48px',
              width: '100%',
              border: 'none',
              borderRadius: '4px',
              margin: '26px 0 10px'
            }}
            textButton={'Dang Nhap'}
            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
          />

          <p>Ban da co Tai khoan ? <WrapperTextLight>Dang ki</WrapperTextLight></p>
        </WrapperContainerLeft>
        <WrapperContainerRight>
          <Image src={imageLogo} preview={false} alt="image-logo" height='203px' width='203px' />
          <h4>Mua sam tai TVT</h4>
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignUpPage
