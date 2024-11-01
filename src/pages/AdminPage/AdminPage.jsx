import React, { useState } from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, DashboardOutlined, HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // Thêm import này
import 'antd/dist/reset.css'; 
import './AdminPage.css'; 
import Dashboard from '../../components/Dashboard/Dashboard';
import AdminUser from '../../components/AdminUser/AdminUser';
import AdminProduct from '../../components/AdminProduct/AdminProduct';

const { Header, Content, Sider } = Layout;

const AdminPage = () => {
  const [selectedKey, setSelectedKey] = useState('dashboard');
  const navigate = useNavigate(); // Khai báo useNavigate

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: 'userManagement',
      icon: <UserOutlined />,
      label: 'User Management',
    },
    {
      key: 'productManagement',
      icon: <ShoppingCartOutlined />,
      label: 'Products Management',
    },
  ];

  const renderPage = (key) => {
    switch(key) {
      case 'dashboard':
        return <Dashboard />;
      case 'userManagement':
        return <AdminUser />;
      case 'productManagement':
        return <AdminProduct />;
      default:
        return <></>;
    }
  };

  const breadcrumbItems = [
    { title: 'Admin' },
    { title: selectedKey === 'userManagement' ? 'User Management' : selectedKey === 'productManagement' ? 'Products Management' : 'Dashboard' },
  ];

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const handleLogoClick = () => {
    navigate('/'); // Chuyển hướng về trang home
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
          <HomeOutlined className="admin-icon" />
          <span className="logo-text">Admin</span>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          items={menuItems}
          onClick={handleMenuClick}
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }} items={breadcrumbItems} />
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            {renderPage(selectedKey)}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
