import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import {
  UserOutlined,
  ProjectOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  SolutionOutlined,
  SwitcherOutlined,
  UserAddOutlined,
  UserSwitchOutlined,
  TeamOutlined,
  ShareAltOutlined
} from '@ant-design/icons';
import axios from 'axios';
import './index.css'

const { Sider } = Layout

function SideMenu(props) {

  const [menuData, setMenuData] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5050/rights?_embed=children').then(res => {
      console.log(res.data);
      setMenuData(res.data)
    })
  }, [])

  const navigate = useNavigate()

  const iconList = {
    '/home': <UserOutlined />,
    '/user-manage/list': <UserAddOutlined />,
    '/user-manage': <UserSwitchOutlined />,
    '/right-manage/role/list': <MailOutlined />,
    '/right-manage/right/list': <SolutionOutlined />,
    '/right-manage': <TeamOutlined />,
    '/news-manage': <SwitcherOutlined />,
    '/audit-manage': <SolutionOutlined />,
    '/publish-manage': <ShareAltOutlined />,
  }

  function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type
    };
  }

  const checkPagePermission = (item) => {
    return item.pagepermisson === 1
  }

  const renderMenu = (menuList) => {
    return menuList.map(item => {
      if (item.children?.length > 0 && checkPagePermission(item)) {
        return getItem(item.title, item.key, iconList[item.key],
          renderMenu(item.children)
        )
      }
      return checkPagePermission(item) && getItem(item.title, item.key, iconList[item.key])
    })
  }

  return (
    <Sider trigger={null} collapsible collapsed={false}>
      <div style={{ display: "flex", height: "100%", "flexDirection": "column" }}>
        <div className="logo">全球新闻发布管理系统</div>
        <div style={{flex: 1, "overflow": "auto"}}>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['1']}
            items={renderMenu(menuData)}
            onClick={(e) => {
              navigate(e.key)
            }}
          />
        </div>
      </div>
    </Sider>
  )
}

export default SideMenu