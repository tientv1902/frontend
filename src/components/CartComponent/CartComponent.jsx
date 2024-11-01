import React from 'react';
import { StarFilled } from '@ant-design/icons';
import './CartComponent.css';

const CartComponent = (props) => {
  const { image, name, price, rating, discount, selled } = props;

  return (
    <div className="cart" hoverable>
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
        <span>{price.toLocaleString()}</span>
        <span className="discount-text">- {discount || 10}%</span>
      </div>
    </div>
  );
};

export default CartComponent;
