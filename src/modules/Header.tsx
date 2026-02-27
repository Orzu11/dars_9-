import { Button, Dropdown } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { clearToken } from '../store/TokenSlice';
import { useNavigate } from 'react-router-dom';
import PATH from '../components/Path';
import type { MenuProps } from 'antd';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearToken());
    localStorage.removeItem("token");
    navigate(PATH.login);
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
    },
  ];

  return (
    <div className="bg-white shadow-md p-4 h-16 flex items-center justify-between">
      <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
      
      <div className="flex items-center gap-4">
        <Dropdown menu={{ items }} placement="bottomRight">
          <Button 
            type="text" 
            icon={<UserOutlined />}
            className="flex items-center gap-2"
          >
            Profile
          </Button>
        </Dropdown>
      </div>
    </div>
  );
};

export default Header;