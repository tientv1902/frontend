import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';

const DefaultComponent = ({ children, isShowFooter }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderComponent />
      <main style={{ flex: 1 }}>{children}</main>
      {isShowFooter && <FooterComponent />} 
    </div>
  );
};

export default DefaultComponent;
