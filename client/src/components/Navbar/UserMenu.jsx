import React from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logOutUser } from '../../redux/userSlice';

const UserMenu = ({ mode }) => {
  const { user, isAuthenticated } = useSelector(state => state.user);
  console.log("user menu auth", isAuthenticated);

  const dispatch = useDispatch();

  return (
    <Menu mode={mode}>
      <Menu.SubMenu 
        title={
          <>
            <Avatar icon={<UserOutlined />} />
            {/* <span className="username">{user.username}</span> */}
          </>
        }
      >
        {isAuthenticated ? (
          <>
            <Menu.Item key="log-out" onClick={() => dispatch(logOutUser())}>
              <LogoutOutlined /> Log out
            </Menu.Item>
          </>
        ) : (
          <>
          
            <Menu.Item key="log-in">
              <UserOutlined /> <Link to="/login">Log in</Link>
            </Menu.Item>
        
          </>
        )}
      </Menu.SubMenu>
    </Menu>
  );
};

export default UserMenu;