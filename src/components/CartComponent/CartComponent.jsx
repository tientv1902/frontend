import React from 'react';
import { StarFilled } from '@ant-design/icons';
import './CartComponent.css';
import { useNavigate } from 'react-router-dom';

const CartComponent = (props) => {
  const { image, name, price, rating, discount, selled, id } = props;
  
  const navigate = useNavigate();

  const handleDetailsProduct = (id) => {
    if (id) {
        console.log('Navigating to product details for ID:', id);
        navigate(`/product-details/${id}`);
    } else {
        console.error('Product ID is undefined in handleDetailsProduct');
    }
};

  return (
    <div className="cart" onClick={() => handleDetailsProduct(id)}>
      <img alt={name} src={image} />
      <div className="style-name-product">{name}</div>
      <div className="report-text">
        <span className="rating-stars">
          {Array.from({ length: Math.floor(rating) }, (_, index) => (
            <StarFilled key={index} className="rating-icon" />
          ))}
        </span>
        <span className="style-text-sell"> | Selled {selled || 1000}+</span>
      </div>
      <div className="price-text">
        <span>{price?.toLocaleString()}</span>
        <span className="discount-text">- {discount || 10}%</span>
      </div>
    </div>
  );
};


export default CartComponent;
