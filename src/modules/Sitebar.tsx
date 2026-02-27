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
import { Link } from 'react-router-dom';
import { PATH } from '../components';

const items = [
  { key: 'home', icon: <PieChartOutlined />, label: <Link to={PATH.home}>Home</Link> },
  { key: 'stacks', icon: <DesktopOutlined />, label: <Link to={PATH.stacks}>Stackes</Link>},
  { key: 'groups', icon: <ContainerOutlined />, label: <Link to={PATH.groups}>Groups</Link> },
  { key: 'teachers', icon: <MailOutlined />, label: <Link to={PATH.teachers}>Teachers</Link> },
  { key: 'students', icon: <AppstoreOutlined />, label: <Link to={PATH.students}>Students</Link> },
  { key: 'rooms', icon: <AppstoreOutlined />, label: <Link to={PATH.rooms}>Rooms</Link> },
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