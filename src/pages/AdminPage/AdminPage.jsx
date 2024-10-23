import React from 'react';
import { Layout, Menu, Breadcrumb, Table } from 'antd';
import { UserOutlined, DashboardOutlined } from '@ant-design/icons';
import 'antd/dist/reset.css'; // Import css của Ant Design

const { Header, Content, Sider } = Layout;
const { SubMenu } = Menu;

const AdminPage = () => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const data = [
    {
      key: '1',
      name: 'A',
      age: 32,
      address: 'address',
    },
    {
      key: '2',
      name: 'B',
      age: 42,
      address: 'address',
    },
  ];

  return (
    
    <Layout style={{ minHeight: '100vh' }}>
      <Sider>
        <div className="logo" style={{ height: '32px', margin: '16px', background: 'rgba(255, 255, 255, 0.3)' }} />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<DashboardOutlined />}>
            Dashboard
          </Menu.Item>
          <SubMenu key="sub1" icon={<UserOutlined />} title="User Management">
            <Menu.Item key="2">Users</Menu.Item>
            <Menu.Item key="3">Roles</Menu.Item>
          </SubMenu>
          <SubMenu key="sub1" icon={<UserOutlined />} title="Products Management">
            <Menu.Item key="2">Products</Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Admin</Breadcrumb.Item>
            <Breadcrumb.Item>Dashboard</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <h2>User List</h2>
            <Table columns={columns} dataSource={data} />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPage;
