import { Badge, Col, message, Popover } from 'antd';
import React, { useState } from 'react';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeaderSmall } from './style';
import { CaretDownOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'; 
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService';
import { resetUser } from '../../redux/slides/userSlide';
import Loading from '../LoadingComponent/Loading';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const handleNavigateLogin = () => {
    navigate('/sign-in');
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await UserService.logoutUser();
      dispatch(resetUser());
      localStorage.removeItem('access_token');
      message.success('Đã đăng xuất thành công!');
    } catch (error) {
      console.error('Logout failed:', error);
      message.error('Đăng xuất thất bại.');
    } finally {
      setLoading(false);
      navigate('/sign-in');
    }
  };

  const content = (
    <div>
      <WrapperContentPopup
        onClick={() => {
          navigate('/profile-user');
        }}
      >
        User information
      </WrapperContentPopup>
      {user?.isAdmin && (
        <WrapperContentPopup
        onClick={() => {
          navigate('/system/admin');
        }}
      >
        System Management
      </WrapperContentPopup>
      )}
      <WrapperContentPopup onClick={handleLogout}>Log out</WrapperContentPopup>
    </div>
  );

  return (
    <div>
      <WrapperHeader>
        <Col span={5} style={{ display: 'flex', alignItems: 'center' }}>
          <div 
            style={{ 
              fontSize: '24px',
              fontWeight: 'bold',
              color: '#333',
              letterSpacing: '1px',
              textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
              cursor: 'pointer',
              transition: 'color 0.3s',
            }}
            onClick={() => navigate('/')}
          >
            TVT Store
          </div>
        </Col>
        <Col span={13}>
          <ButtonInputSearch size="large" textButton="Search" placeholder="Input Search" />
        </Col>
        <Col span={6} style={{ display: 'flex', gap: '44px', alignItems: 'center' }}>
          <Loading isPending={loading}>
            <WrapperHeaderAccount>
              {user?.access_token ? (
                <>
                  <img
                    src={user.avatar}
                    alt="User Avatar"
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      marginRight: '10px',
                      objectFit: 'cover',
                      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                  <Popover content={content} trigger="click">
                    <div
                      style={{
                        display: 'flex', 
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        color: '#333',
                        fontSize: '16px',
                        fontWeight: '600',
                        padding: '5px 10px',
                        borderRadius: '5px',
                        transition: 'background-color 0.3s',
                        width: '150px',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
                    >
                      <span>
                        {user?.name.length ? user?.name : user?.email}
                      </span>
                      <CaretDownOutlined style={{ marginLeft: 'auto' }} /> 
                    </div>
                  </Popover>
                </>
              ) : (
                <div 
                  onClick={handleNavigateLogin} 
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                >
                  <UserOutlined style={{ fontSize: '25px', marginRight: '8px', color: '#333' }} /> 
                  <WrapperTextHeaderSmall>Account</WrapperTextHeaderSmall>
                   
                </div>
              )}
            </WrapperHeaderAccount>
          </Loading>
          <div 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer' 
          }} 
          onClick={() => navigate('')}
        >
          <Badge count={4} style={{ margin: '0' }}> 
            <ShoppingCartOutlined style={{ fontSize: '25px', color: '#333' }} />
          </Badge>
          <WrapperTextHeaderSmall style={{ marginLeft: '4px', marginTop: '2px' }}>  
            Cart
          </WrapperTextHeaderSmall>
        </div>
        </Col>
      </WrapperHeader>
    </div>
  );
};

export default HeaderComponent;
