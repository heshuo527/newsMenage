import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  MenuFoldOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Layout, Dropdown, Avatar } from 'antd';
const { Header } = Layout;

function TopHeader() {

  const navigate = useNavigate()
  const location = useLocation()
  console.log('location', location);

  const [collapsed, setCollapsed] = useState(false)
  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  const items = [
    {
      key: '1',
      onClick: () => { console.log(1) },
      label: (
        '超级管理'
      ),
    },
    {
      key: '2',
      danger: true,
      onClick: () => {
        localStorage.removeItem("token")
        navigate('/login')
      },
      label: '退出',
    },
  ];

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {
        collapsed ? <MenuFoldOutlined onClick={changeCollapsed} /> : <MenuFoldOutlined onClick={changeCollapsed} />
      }
      <div style={{ float: "right" }}>
        <span>
          欢迎admin回来
        </span>
        <Dropdown menu={{ items }} >
          <Avatar size={32} icon={<UserOutlined />} />
        </Dropdown>
      </div>
    </Header>
  )
}

export default TopHeader