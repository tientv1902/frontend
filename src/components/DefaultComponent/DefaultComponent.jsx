// components/DefaultComponent/DefaultComponent.js
import React from 'react';
import HeaderComponent from '../HeaderComponent/HeaderComponent';
import FooterComponent from '../FooterComponent/FooterComponent';

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeaderComponent />
      <main style={{ flex: 1 }}>{children}</main>
      <FooterComponent />
    </div>
  );
};

export default DefaultComponent;
