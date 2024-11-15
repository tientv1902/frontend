import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './AboutUsPage.css';

const AboutUsPage = () => {
  const navigate = useNavigate(); 

  const goHome = () => {
    navigate('/'); 
  };

  return (
    <div className="about-us-page">
      <h1 className="page-title">About Us</h1>

      <div className="section">
        <h2>Company Info</h2>
        <p>
          TVT Store is a leading e-commerce platform that provides a wide range of products, from electronics to lifestyle items. Our mission is to make online shopping simple, fast, and reliable for customers across the globe.
        </p>
      </div>

      <div className="section">
        <h2>Careers</h2>
        <p>
          At TVT Store, we value innovation, creativity, and customer-centricity. We are always looking for passionate individuals to join our team. Explore our career opportunities and be a part of our growing family.
        </p>
      </div>

      <div className="section">
        <h2>Press Releases</h2>
        <p>
          Stay updated with the latest news and announcements from TVT Store. Our press releases cover product launches, partnerships, and other exciting developments.
        </p>
      </div>

      <div className="section">
        <h2>Blog</h2>
        <p>
          Visit our blog for the latest trends, product reviews, and tips to enhance your shopping experience. Stay informed and get the most out of your purchases at TVT Store.
        </p>
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button className="back-home-button" onClick={goHome}>Back to Home</button>
      </div>
    </div>
  );
};

export default AboutUsPage;
