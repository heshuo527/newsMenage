import React from 'react'
import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '../views/login/Login'
import NewsSandBox from '../views/sandbox/NewSandBox'

function IndexRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/*' element={
                    localStorage.getItem("token") ?
                        <NewsSandBox /> :
                        <Navigate to='/login' />
                }></Route>
            </Routes>
        </HashRouter>
    )
}

export default IndexRouter