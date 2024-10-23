import React from 'react'
import { StyleNameProduct, WrapperCartStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText, WrapperStyleTextSell } from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/images/logo.png'


const CartComponent = (props) => {
  const {countInStock, description, image, name, price, rating, type, discount, selled} = props
  
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
    <StyleNameProduct>{name}</StyleNameProduct>
    <WrapperReportText>
        <span style={{marginRight:'4px'}}>
            <span>{rating}</span><StarFilled style={{fontSize: '12px', color: 'yellow'}} />   
        </span>
            <WrapperStyleTextSell> | Selled {selled || 1000}+</WrapperStyleTextSell>
     </WrapperReportText>
     <WrapperPriceText>
      <span style={{marginRight: "8px"}}>{price}</span>
        
        <WrapperDiscountText>
            {discount || 5}%
        </WrapperDiscountText>
    </WrapperPriceText>
  </WrapperCartStyle>
  )
}

export default CartComponent