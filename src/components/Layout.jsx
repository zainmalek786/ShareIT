import React from 'react';
import SideBar from './SideBar';
import Right from './Right';
import { Outlet } from 'react-router-dom';
function Layout() {
    return ( <>
    <div className="w-screen   flex h-screen absolute overflow-hidden left-0 top-0 ">

    
    <SideBar/>
    <Outlet/>
    <Right />

    </div>
    </> );
}

export default Layout;