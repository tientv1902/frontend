import React from 'react';
import { Col } from 'antd';
import { WrapperFooter, WrapperFooterSection, WrapperFooterText, WrapperFooterLink, WrapperFooterIcon } from './style';
import {
  FacebookOutlined,
  TwitterOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';

const FooterComponent = () => {
  return (
    <WrapperFooter>
      <WrapperFooterSection gutter={16}>
        {/* Company Information */}
        <Col span={6}>
          <WrapperFooterText>
            <strong>About Us</strong>
          </WrapperFooterText>
          <WrapperFooterLink href="#">Company Info</WrapperFooterLink>
          <WrapperFooterLink href="#">Careers</WrapperFooterLink>
          <WrapperFooterLink href="#">Press Releases</WrapperFooterLink>
          <WrapperFooterLink href="#">Blog</WrapperFooterLink>
        </Col>

        {/* Customer Support */}
        <Col span={6}>
          <WrapperFooterText>
            <strong>Customer Support</strong>
          </WrapperFooterText>
          <WrapperFooterLink href="#">Help Center</WrapperFooterLink>
          <WrapperFooterLink href="#">Returns</WrapperFooterLink>
          <WrapperFooterLink href="#">Order Tracking</WrapperFooterLink>
          <WrapperFooterLink href="#">Shipping Info</WrapperFooterLink>
        </Col>

        {/* Legal Links */}
        <Col span={6}>
          <WrapperFooterText>
            <strong>Legal</strong>
          </WrapperFooterText>
          <WrapperFooterLink href="#">Terms of Service</WrapperFooterLink>
          <WrapperFooterLink href="#">Privacy Policy</WrapperFooterLink>
          <WrapperFooterLink href="#">Cookie Policy</WrapperFooterLink>
        </Col>

        {/* Social Media Links */}
        <Col span={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <WrapperFooterText>
            <strong>Follow Us</strong>
          </WrapperFooterText>
          <div style={{ display: 'flex', gap: '10px' }}>
            <WrapperFooterIcon>
              <FacebookOutlined />
            </WrapperFooterIcon>
            <WrapperFooterIcon>
              <TwitterOutlined />
            </WrapperFooterIcon>
            <WrapperFooterIcon>
              <InstagramOutlined />
            </WrapperFooterIcon>
            <WrapperFooterIcon>
              <YoutubeOutlined />
            </WrapperFooterIcon>
          </div>
        </Col>
      </WrapperFooterSection>

      {/* Copyright */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <WrapperFooterText>© 2024 Your Company. All rights reserved.</WrapperFooterText>
      </div>
    </WrapperFooter>
  );
};

export default FooterComponent;
