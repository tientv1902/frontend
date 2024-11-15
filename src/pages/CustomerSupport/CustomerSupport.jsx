import React from 'react';
import './CustomerSupport.css'; 
import { useNavigate } from 'react-router-dom';

const CustomerSupport = () => {
    const navigate = useNavigate(); 

  const goHome = () => {
    navigate('/'); 
  };
  return (
    <div className="customer-support-page">
      <h1 className="page-title">Customer Support</h1>

      <div className="section">
        <h2>Help Center</h2>
        <p>
          Our Help Center provides answers to commonly asked questions and troubleshooting tips. Get the support you need quickly and easily.
        </p>
      </div>

      <div className="section">
        <h2>Returns</h2>
        <p>
          If you are not satisfied with your purchase, you can initiate a return within 30 days. Visit our Returns page to start the process.
        </p>
      </div>

      <div className="section">
        <h2>Order Tracking</h2>
        <p>
          Track the status of your orders using our order tracking tool. Stay updated with the latest shipping and delivery information.
        </p>
      </div>

      <div className="section">
        <h2>Shipping Info</h2>
        <p>
          Learn about our shipping methods, estimated delivery times, and international shipping options. We offer fast and reliable shipping worldwide.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="back-home-button" onClick={goHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default CustomerSupport;
