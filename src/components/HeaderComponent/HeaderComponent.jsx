import { Badge, Col, message, Popover} from 'antd'
import React, { useState } from 'react'
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
}from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../services/UserService'
import {resetUser} from '../../redux/slides/userSlide'
import Loading from '../LoadingComponent/Loading';


const HeaderComponent = () => {
  const navigate = useNavigate()
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const handleNavigateLogin = () =>{
    navigate('/sign-in')
  }

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
      <WrapperContentPopup onClick={handleLogout}>Log out</WrapperContentPopup>
      <WrapperContentPopup>User information</WrapperContentPopup>
    </div>
  )

  return (
    <div >
      <WrapperHeader >
        <Col span={5}>
        <WrapperTextHeader>TVT</WrapperTextHeader>
        </Col>
        <Col span={13}>
        <ButtonInputSearch
              size="large"
              textButton="Search"
              placeholder="Input Search"
              // onSearch={onSearch}
             
            />
        </Col>
        <Col span={6} style={{display: 'flex', gap: '44px',alignItems:'center'}}>
        <Loading isPending={loading}>
        <WrapperHeaderAccount>
          <UserOutlined style={{fontSize: '30px'}}/>
          {user?.name ? (
            <>
            <Popover content={content} trigger="click">
              <div style={{cursor: 'pointer'}}>{user.name}</div>
            </Popover>
            </>
            
          ) : (
            <div onClick={handleNavigateLogin} style={{cursor: 'pointer'}}>
            <WrapperTextHeaderSmall></WrapperTextHeaderSmall>
            <div>
              <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
              <CaretDownOutlined/>
            </div>    
          </div>
          )}
        </WrapperHeaderAccount>
        </Loading>
        <Badge count={4}>
          <ShoppingCartOutlined style={{fontSize: '25px'}}/>
          <WrapperTextHeaderSmall>Cart</WrapperTextHeaderSmall>
        </Badge>
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent