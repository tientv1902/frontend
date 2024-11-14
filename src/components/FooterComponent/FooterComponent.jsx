import React from 'react';
import { Col, Row } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import { FaPaypal } from 'react-icons/fa'; // If using react-icons for PayPal icon
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './FooterComponent.css'; 

const FooterComponent = () => {
  const navigate = useNavigate(); 

  const goToAboutUs = () => {
    navigate('/AboutUs');
  };

  const goToCustomerSupport = () => {
    navigate('/CustomerSupport');
  };

  const goToLegal = () => {
    navigate('/Legal');
  };

  return (
    <div className="footer">
      <Row gutter={16} className="wrapper-footer-section">
        <Col span={6}>
          <span className="footer-text">
            <strong>About Us</strong>
          </span>
          <button className="footer-link" onClick={goToAboutUs}>Company Info</button>
          <button className="footer-link" onClick={goToAboutUs}>Careers</button>
          <button className="footer-link" onClick={goToAboutUs}>Press Releases</button>
          <button className="footer-link" onClick={goToAboutUs}>Blog</button>
        </Col>

        <Col span={6}>
          <span className="footer-text">
            <strong>Customer Support</strong>
          </span>
          <button className="footer-link" onClick={goToCustomerSupport}>Help Center</button>
          <button className="footer-link" onClick={goToCustomerSupport}>Returns</button>
          <button className="footer-link" onClick={goToCustomerSupport}>Order Tracking</button>
          <button className="footer-link" onClick={goToCustomerSupport}>Shipping Info</button>
        </Col>

        <Col span={6}>
          <span className="footer-text">
            <strong>Legal</strong>
          </span>
          <button className="footer-link" onClick={goToLegal}>Terms of Service</button>
          <button className="footer-link" onClick={goToLegal}>Privacy Policy</button>
          <button className="footer-link" onClick={goToLegal}>Cookie Policy</button>
        </Col>

        <Col span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="footer-text">
            <strong>Follow Us</strong>
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <span className="footer-icon">
              <FacebookOutlined />
            </span>
            <span className="footer-icon">
              <TwitterOutlined />
            </span>
            <span className="footer-icon">
              <InstagramOutlined />
            </span>
            <span className="footer-icon">
              <YoutubeOutlined />
            </span>
          </div>
        </Col>
      </Row>

      <Row gutter={16} className="wrapper-footer-section">
        <Col span={24} style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <span className="footer-text">
            <strong>Payment Methods</strong>
          </span>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <span className="footer-icon">
              <FaPaypal style={{ fontSize: '24px', color: 'black' }} />
            </span>
            <span className="footer-text">Pay with PayPal</span>
          </div>
        </Col>
      </Row>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span className="footer-text">© 2024 TVT Store. All rights reserved.</span>
      </div>
    </div>
  );
};

export default FooterComponent;
