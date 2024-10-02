import { Badge, Col} from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'

import {
  UserOutlined,
  CaretDownOutlined,
  ShoppingCartOutlined,
}from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';

const HeaderComponent = () => {
  return (
    <div >
      <WrapperHeader >
        <Col span={5}>
        <WrapperTextHeader>TVT</WrapperTextHeader>
        </Col>
        <Col span={13}>
        <ButtonInputSearch
              size="large"
              bordered={false}
              textButton="Search"
              placeholder="Input Search"
              // onSearch={onSearch}
             
            />
        </Col>
        <Col span={6} style={{display: 'flex', gap: '44px',alignItems:'center'}}>
        <WrapperHeaderAccount>
          <UserOutlined style={{fontSize: '30px'}}/>
          <div>
            <WrapperTextHeaderSmall>Đăng nhập / Đăng kí</WrapperTextHeaderSmall>
            <div>
              <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
              <CaretDownOutlined/>
            </div>    
          </div>
        </WrapperHeaderAccount>
        <Badge count={4}>
          <ShoppingCartOutlined style={{fontSize: '25px'}}/>
          <dWrapperTextHeaderSmall>Cart</dWrapperTextHeaderSmall>
        </Badge>
        
        
        </Col>
      </WrapperHeader>
    </div>
  )
}

export default HeaderComponent