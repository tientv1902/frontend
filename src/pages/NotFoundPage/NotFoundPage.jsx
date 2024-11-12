import React from 'react';
import './NotFoundPage.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">Page Not Found</p>
        <a href="/" className="back-home">Go Back to Home</a>
      </div>
    </div>
  );
};

export default NotFoundPage;
