import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider111 from '../../assets/images/slider111.png'
import slider2 from '../../assets/images/slider2.png'
import slider3 from '../../assets/images/slider3.png'
import slider5 from '../../assets/images/slider5.png'
import CartComponent from '../../components/CartComponent/CartComponent'


const HomePage = () => {
  const arr = ['TV', 'Laptop', 'Iphone']
  return (
    <>
    <div style={{padding: '0 120px'}}>
      <WrapperTypeProduct>{arr.map((item)=>{
        return(
          <TypeProduct name={item} key={item}/>
        )
      })}
      </WrapperTypeProduct>
      
    </div>
    <div id="container" style={{backgroundColor: '#F1F1F1', padding: '0 120px', height: '1000px'}}>
    <SliderComponent arrImages={[slider111, slider2, slider3, slider5]}/>
    <WrapperProducts>
      <CartComponent />
      <CartComponent />
      <CartComponent />
      <CartComponent />
      <CartComponent />
      <CartComponent />
      <CartComponent />
      <CartComponent />
      <CartComponent />
      <CartComponent />
    </WrapperProducts>
    <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px'}}>
      <WrapperButtonMore textButton="xem them" type="outline" styleButton={{
      border: '1px solid rgb(11, 116, 229)', color: 'rgb(11, 116, 229)',
      width: '240px', height: '38px', borderRadius: '4px'
    }} 
    styleTextButton={{fontWeight: 500}}/>
    </div>
    
  </div>
  
    </>
  )
}

export default HomePage