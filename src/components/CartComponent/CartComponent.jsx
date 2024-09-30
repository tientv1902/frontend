import React from 'react'
import { StyleNameProduct, WrapperCartStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/images/logo.png'


const CartComponent = () => {
  return (
    <WrapperCartStyle
    hoverable
    // headStyle={{width:'200px', height:'200px'}}
    style={{ width: 200 }}
    // bodyStyle={{padding: '10px'}}
    cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
  >
    <img 
        src={logo} 
        style={{
          width: '68px', 
          height: '14px', 
          position: 'absolute', 
          top: '-1px', 
          left: '-1px',
          borderTopLeftRadius: '3px',
        }} 
        alt="Logo"
      />
    <StyleNameProduct>Iphone</StyleNameProduct>
    <WrapperReportText>
        <span style={{marginRight:'4px'}}>
            <span>4.5</span><StarFilled style={{fontSize: '12px', color: 'yellow'}} />   
        </span>
            <WrapperStyleTextSell> | Da ban 1000+</WrapperStyleTextSell>
     </WrapperReportText>
     <WrapperPriceText>
        100.000vnd
        <WrapperDiscountText>
            -5%
        </WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCartStyle>
  )
}

export default CartComponent