import { useState } from 'react';
import { Menu, Button } from 'antd';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';

const items = [
  { key: 'home', icon: <PieChartOutlined />, label: 'Dashboard' },
  { key: 'stacks', icon: <DesktopOutlined />, label: 'Stacks' },
  { key: 'groups', icon: <ContainerOutlined />, label: 'Groups' },
  { key: 'teachers', icon: <MailOutlined />, label: 'Teachers' },
  { key: 'students', icon: <AppstoreOutlined />, label: 'Students' },
  { key: 'rooms', icon: <AppstoreOutlined />, label: 'Rooms' },
];

const Sitebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div style={{ width: '22%', height: '100vh', backgroundColor: '#001529' }}>
      <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16, marginLeft: 16, marginTop: 16 }}>
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu
        defaultSelectedKeys={['home']}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={items}
      />
    </div>
  );
};

export default Sitebar;