import { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  AppstoreAddOutlined,
  FileImageOutlined,
  LineChartOutlined,
  UsergroupAddOutlined,
  AuditOutlined
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Dropdown } from 'antd';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate()
  const location = useLocation()

  const token = localStorage.getItem("token")
  const userData = JSON.parse(localStorage.getItem("auth"))

  useEffect(() => {
    if(!token) {
      navigate("/login")
    }
  },[])

  const handleLogout = () => {
    navigate("/login")
    localStorage.removeItem("auth");
    localStorage.removeItem("token");
  }

  const items = [
    {
      key: '1',
      label: "Đăng xuẩt",
      onClick: handleLogout
    },
  ];
  return (
    <Layout className='h-screen'>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/admin',
              icon: <LineChartOutlined />,
              label:<Link to="/admin"> Quản lý thống kê</Link>
              ,
            },
            {
              key: '/admin/service',
              icon: <AppstoreAddOutlined />,
              label: <Link to="/admin/service?page=1&limit=5">Quản lý dịch vụ</Link>,
            },
            {
              key: '/admin/service-package',
              icon: <AuditOutlined />,
              label: <Link to="/admin/service-package?page=1&limit=5">Quản lý gói dịch vụ</Link>,
            },
            {
              key: '/admin/staff',
              icon: <UsergroupAddOutlined />,
              label: <Link to="/admin/staff?page=1&limit=3">Quản lý nhân viên</Link>,
            },
            {
              key: '/admin/banner',
              icon: <FileImageOutlined />,
              label: <Link to="/admin/banner?page=1&limit=5">Quản lý banner</Link>,
            },

          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <div className='flex justify-between items-center pr-5'>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
            <div className='flex items-center gap-2.5'>
              <p className='font-medium'>{userData?.userName}</p>
              <Dropdown menu={{ items }} placement="bottom" arrow>
                  <Button className='w-12 h-12 bg-slate-400 rounded-full'></Button>
              </Dropdown>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;