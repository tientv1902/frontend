import React from 'react';
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent';
import { useNavigate, useParams } from 'react-router-dom';
import './ProductDetailsPage.css'; 

const ProductDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="product-details-page">
        <h5>
          <span onClick={() => { navigate('/'); }} className="breadcrumb-link" style={{cursor: 'pointer'}}>
            Home
          </span>
          / Product Details
        </h5>
        <div className="product-details-wrapper">
          <ProductDetailsComponent productId={id} />
        </div>
    </div>
  );
};

export default ProductDetailsPage;
