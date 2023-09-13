import React, { useState } from "react";
// import styled from 'styled-components';
// import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'

import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import { useNavigate, NavLink } from "react-router-dom";
// import "@trendmicro/react-sidenav/dist/react-sidenav.css";  
import SidebarItems from "./SideNavItems";



function Nav({show}) {
    
    const navigate = useNavigate();

    return (
        <div className="sidenav">
            <div className={show ? "mysidenav active" : "mysidenav"}>
                    <img src={require("../../Images/logo_ 2.png")} 
                    alt="logo"
                    className="logo"
                    />
                    <ul class="fa-ul">
                        <li><span class="fa-li"><i class="fa-solid fa-table-columns"></i></span><a href="/">Dashboard</a></li>
                        <li><span class="fa-li"><i class="fa-solid fa-database"></i></span><a href="/">Stock</a></li>
                        <li><span class="fa-li"><i class="fa-solid fa-arrow-right-from-bracket"></i></span>Log out</li>
                    </ul>
                </div>

                {/* <SideNav
                    onSelect={selected => {
                        console.log(selected);
                        navigate('/' + selected);
                    }}
                    className='mysidenav'
                >
                    <div className="logo">
                        <img className="logo" src={require("C:/Users/mrput/Documents/VSProject/POS_Piece-Of-Software/Frontend/pos/src/components/logo_ 2.png")} alt="Stock | Product" style={{ height: 'auto', width: 'auto' }} />
                    </div>
                    <SideNav.Toggle onClick={handleToggle} />
                    <SideNav.Nav defaultSelected="Stock">
                        <NavItem eventKey="Dashboard" style={{ margin: '45px 0px 0px' }}>
                            <NavIcon><i class="fa-solid fa-table-columns"></i></NavIcon>
                            <NavText>Dashboard</NavText>
                        </NavItem>
                        <NavItem eventKey="Stock">
                            <NavIcon><i class="fa-solid fa-database"></i></NavIcon>
                            <NavText>Stock</NavText>
                        </NavItem>
                        <NavItem eventKey="Logout" style={{ position: 'absolute', display: 'flex', bottom: 0 }}>
                            <NavIcon><i class="fa-solid fa-arrow-right-from-bracket"></i></NavIcon>
                            <NavText>Log out</NavText>
                        </NavItem>
                    </SideNav.Nav>
                </SideNav> */}
        </div>
    );
}

export default Nav;