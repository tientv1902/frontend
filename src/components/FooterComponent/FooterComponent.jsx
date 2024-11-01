import React from 'react';
import { Col, Row } from 'antd';
import { FacebookOutlined, TwitterOutlined, InstagramOutlined, YoutubeOutlined } from '@ant-design/icons';
import './FooterComponent.css'; 

const FooterComponent = () => {
  return (
    <div className="footer">
      <Row gutter={16} className="wrapper-footer-section">
        <Col span={6}>
          <span className="footer-text">
            <strong>About Us</strong>
          </span>
          <button className="footer-link">Company Info</button>
          <button className="footer-link">Careers</button>
          <button className="footer-link">Press Releases</button>
          <button className="footer-link">Blog</button>
        </Col>

        <Col span={6}>
          <span className="footer-text">
            <strong>Customer Support</strong>
          </span>
          <button className="footer-link">Help Center</button>
          <button className="footer-link">Returns</button>
          <button className="footer-link">Order Tracking</button>
          <button className="footer-link">Shipping Info</button>
        </Col>

        <Col span={6}>
          <span className="footer-text">
            <strong>Legal</strong>
          </span>
          <button className="footer-link">Terms of Service</button>
          <button className="footer-link">Privacy Policy</button>
          <button className="footer-link">Cookie Policy</button>
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

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <span className="footer-text">© 2024 TVT. All rights reserved.</span>
      </div>
    </div>
  );
};

export default FooterComponent;
