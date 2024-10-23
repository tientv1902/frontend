import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';

const DefaultComponent = ({ children, isShowFooter }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderComponent />
      <main style={{ flex: 1 }}>{children}</main>
      {isShowFooter && <FooterComponent />} {/* Kiểm tra và hiển thị footer nếu có isShowFooter */}
    </div>
  );
};

export default DefaultComponent;
