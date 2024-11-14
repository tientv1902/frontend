import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Legal.css'; // Import file CSS

const Legal = () => {
  const navigate = useNavigate(); // Khởi tạo hàm navigate

  // Hàm để điều hướng về trang chủ
  const goHome = () => {
    navigate('/'); // Điều hướng về trang chủ (chỉnh lại đường dẫn nếu cần)
  };

  return (
    <div className="legal-page">
      <h1 className="page-title">Legal Information</h1>

      <div className="section">
        <h2>Terms of Service</h2>
        <p>
          By accessing and using our website, you agree to abide by our Terms of Service. Please read the terms carefully before using our services.
        </p>
      </div>

      <div className="section">
        <h2>Privacy Policy</h2>
        <p>
          We value your privacy and are committed to protecting your personal information. Our Privacy Policy outlines how we collect, use, and store your data.
        </p>
      </div>

      <div className="section">
        <h2>Cookie Policy</h2>
        <p>
          Our Cookie Policy explains how we use cookies to improve your browsing experience and personalize our services. Learn more about our cookie practices.
        </p>
      </div>

      {/* Nút quay lại trang chủ */}
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="back-home-button" onClick={goHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default Legal;
