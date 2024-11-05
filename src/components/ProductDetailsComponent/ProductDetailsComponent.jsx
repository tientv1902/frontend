import React, { useEffect, useState } from 'react';
import { Col, Image, Row } from 'antd';
// import imageProductSmall from '../../assets/images/imagesmall3.webp';
import {
    WrapperAddressProduct,
    WrapperInputNumber,
    WrapperPriceProduct,
    WrapperPriceTextProduct,
    WrapperQualityProduct,
    WrapperStyeNameProduct,
    WrapperStyleTextSell
} from './style';
import { StarFilled, PlusOutlined, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductService from '../../services/ProductService';
import { useQuery } from '@tanstack/react-query';
import Loading from '../LoadingComponent/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { orderProduct } from '../../redux/slices/orderSlice';

const ProductDetailsComponent = () => {
    const { id: productId } = useParams();
    
    const [numProduct, setNumProduct] = useState(1); 
    const user = useSelector((state) => state.user);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const onChange = (value) => {
        setNumProduct(Number(value));
    };
    console.log("Product ID from URL:", productId);

    
    const fetchGetDetailsProduct = async ({ queryKey }) => {
        const id = queryKey[1]?.id || queryKey[1];
        if (id) {
            const res = await ProductService.getDetailsProduct(id);
            return res.data;
        }
    };

    const { data: productDetails, isPending } = useQuery({
        queryKey: ['product-details', productId],
        queryFn: fetchGetDetailsProduct,
        enabled: !!productId,
    });

    useEffect(() => {
        if (productId) {
            console.log("Fetching details for product ID:", productId);
        }
    }, [productId]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, index) => (
            <StarFilled
                key={index}
                style={{
                    fontSize: '12px',
                    color: index < rating ? 'rgb(253, 216, 54)' : '#d9d9d9', 
                }}
            />
        ));
    };

    const handleCount = (type) => {
        if (type === 'increase') {
            setNumProduct(prevNum => prevNum + 1);
        } else if (type === 'decrease' && numProduct > 1) {
            setNumProduct(prevNum => prevNum - 1);
        }
    };

    const handleByNow = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            dispatch(orderProduct({
                orderItem: {
                    name: productDetails?.name,
                    amount: numProduct,
                    image: productDetails?.image,
                    discount: productDetails?.discount || 0,
                    price: productDetails?.price,
                    product: productDetails?._id,
                }
            }));
        }
    };

    const discountedPrice = productDetails?.discount ? 
        productDetails.price - productDetails.discount : productDetails?.price;

    return (
        <Loading isPending={isPending}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '2px solid #e5e5e5', paddingRight: '10px' }}>
                    <Image src={productDetails?.image} alt="image product" preview={false} />
                    {/* <Row style={{ paddingTop: '10px', justifyContent: 'space-between' }}>
                        {Array(5).fill(null).map((_, index) => (
                            <WrapperStyleColImage span={4} key={index}>
                                <WrapperStyleImageSmall src={imageProductSmall} alt="image small" preview={false} />
                            </WrapperStyleColImage>
                        ))}
                    </Row> */}
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyeNameProduct>{productDetails?.name}</WrapperStyeNameProduct>
                    <div>
                        {renderStars(productDetails?.rating)} 
                        <WrapperStyleTextSell> | Already sold 100+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        {productDetails?.discount && (
                            <div style={{ textDecoration: 'line-through', marginRight: '8px' }}>
                                {productDetails?.price?.toLocaleString()} VNĐ
                            </div>
                        )}
                        <WrapperPriceTextProduct>{discountedPrice?.toLocaleString()} VNĐ</WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span></span>
                        <span className='address'>Deliver to: {user?.address} - {user?.city}</span>
                        <span className='change-address'> Address change </span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5e5e5', borderBottom: '1px solid #e5e5e5' }}>
                        <div style={{ marginBottom: '10px' }}>Quantity</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleCount('increase')} >
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                            <WrapperInputNumber
                                style={{ width: '600000px', borderTop: 'none', borderBottom: 'none' }}  
                                onChange={onChange}
                                value={numProduct}
                                min={1} 
                                size="small"
                            />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer'}} onClick={() => handleCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '220px',
                                border: 'none',
                                borderRadius: '4px'
                            }}
                            textButton={'Buy Now'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: 700 }}
                            onClick={handleByNow}
                        />
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px',
                                width: '220px',
                                border: '1px solid rgb(13, 92, 182)',
                                borderRadius: '4px'
                            }}
                            textButton={'Mua Trả Sau'}
                            styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        />
                    </div>
                </Col>
            </Row>
        </Loading>
    );
};

export default ProductDetailsComponent;
