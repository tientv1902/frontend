import React, { useState } from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct';
import SliderComponent from '../../components/SliderComponent/SliderComponent';
import slider111 from '../../assets/images/slider111.png';
import slider2 from '../../assets/images/slider2.png';
import slider3 from '../../assets/images/slider3.png';
import slider5 from '../../assets/images/slider5.png';
import CartComponent from '../../components/CartComponent/CartComponent';
import { useQuery } from '@tanstack/react-query';
import * as ProductService from '../../services/ProductService';
import './HomePage.css'; // Nhập tệp CSS
import { Button } from 'antd';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounceHook } from '../../hooks/useDebounceHook';
import FooterComponent from '../../components/FooterComponent/FooterComponent';

const HomePage = () => {
  const searchProduct = useSelector((state) => state?.product?.search)
  const useSearchHook = useDebounceHook(searchProduct, 500)
  const [limit, setLimit] = useState(5)
  const [pending, setPending] = useState(false)
  const arr = ['TV', 'Laptop', 'Iphone'];

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
      const res = await ProductService.getAllProduct(search, limit);
      return res
    }
    

  const { data: products, isPending, isPreviousData } = useQuery({
    queryKey: ['product', limit, useSearchHook], 
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true
  });

  console.log("isPreviousData",isPreviousData, isPending)

  return (
    <Loading isPending={isPending || pending}>
      <div style={{ padding: '0 120px' }}>
        <div className="type-product">
          {arr.map((item) => (
            <TypeProduct name={item} key={item} />
          ))}
        </div>
      </div>
      <div id="container">
        <SliderComponent arrImages={[slider111, slider2, slider3, slider5]} />
        <div className="products">
        {products?.data?.map((product) => (
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
        />))}
          
        </div>
        <div className="button-more">
          <Button
            disabled={products?.total === products?.data?.length || products?.totalPage === 1 }
            style={{
              border: '1px solid rgb(11, 116, 229)', 
              color: 'rgb(11, 116, 229)', 
              backgroundColor: 'white', 
              width: '240px', 
              height: '38px', 
              borderRadius: '4px', 
              transition: 'background-color 0.3s, color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'rgb(11, 116, 229)'; 
              e.currentTarget.style.backgroundColor = '#d1e1fc'; 
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'rgb(11, 116, 229)'; 
              e.currentTarget.style.backgroundColor = 'white'; 
            }}
            onClick={() => setLimit((prev) => prev + 5)}
          >
            See more
          </Button>
        </div>
      </div>
      <FooterComponent /> 
    </Loading>
  );

};

export default HomePage;
