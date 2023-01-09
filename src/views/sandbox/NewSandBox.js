import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SideMenu from '../../components/sandbox/SideMenu'
import TopHeader from '../../components/sandbox/TopHeader'
import Home from './home/Home'
import UserList from './user-manage/UserList'
import RightList from './right-manage/RightList'
import RoleList from './right-manage/RoleList'
import NoPermission from './nopermission/NoPermission'
import { Layout } from 'antd'

import './NewSandBox.css'

const { Content } = Layout;

function NewsSandBox() {
    return (
        <Layout>
            <SideMenu />
            <Layout className="site-layout">
                <TopHeader />
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,

                    }}
                >
                    <Routes>
                        <Route path='/home' element={<Home />} />
                        <Route path='/user-manage/list' element={<UserList />} />
                        <Route path='/right-manage/role/list' element={<RoleList />} />
                        <Route path='/right-manage/right/list' element={<RightList />} />
                        <Route path='/' element={
                            <Navigate to='/home' />
                        } />
                        <Route path='*' element={<NoPermission />} />
                    </Routes>
                </Content>
            </Layout>
        </Layout>
    )
}

export default NewsSandBox