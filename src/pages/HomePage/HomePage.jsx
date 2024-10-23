import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider111 from '../../assets/images/slider111.png'
import slider2 from '../../assets/images/slider2.png'
import slider3 from '../../assets/images/slider3.png'
import slider5 from '../../assets/images/slider5.png'
import CartComponent from '../../components/CartComponent/CartComponent'
import { useQuery } from '@tanstack/react-query'
import * as ProductService from '../../services/ProductService'

const HomePage = () => {
  const arr = ['TV', 'Laptop', 'Iphone']

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct()
    return res 
  }

  const { data: products } = useQuery({
    queryKey: ['product'], 
    queryFn: fetchProductAll,
    retry: 3, retryDelay: 1000
  })

  console.log("products", products)

  return (
    <>
      <div style={{ padding: '0 120px' }}>
        <WrapperTypeProduct>
          {arr.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </WrapperTypeProduct>
      </div>
      <div id="container" style={{ backgroundColor: '#F1F1F1', padding: '0 120px', height: '1000px' }}>
        <SliderComponent arrImages={[slider111, slider2, slider3, slider5]} />
        <WrapperProducts>
          {products?.data?.map((product) =>{
            return(
              <CartComponent 
                key={product._id} 
                countInStock={product.countInStock} 
                description={product.description} 
                image={product.image}
                name={product.name} 
                price={product.price}
                rating={product.rating}
                type={product.type}
                selled={product.selled}
                discount={product.discount}
             />
            )
          })}
        </WrapperProducts>
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
          <WrapperButtonMore
            textButton="xem them"
            type="outline"
            styleButton={{
              border: '1px solid rgb(11, 116, 229)',
              color: 'rgb(11, 116, 229)',
              width: '240px',
              height: '38px',
              borderRadius: '4px'
            }}
            styleTextButton={{ fontWeight: 500 }}
          />
        </div>
      </div>
    </>
  )
}

export default HomePage
