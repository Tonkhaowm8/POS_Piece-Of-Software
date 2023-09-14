import React, { useState } from "react";
// import styled from 'styled-components';
// import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import './SideNav.css';
// import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import { useNavigate, Link } from "react-router-dom";
import SidebarItems from "./SideNavItems";



function Nav({show, children}) {
    const [isOpen, setIsOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };
    
    // const navigate = useNavigate();

    return (
        <div className="sidenav">
            <div className={show ? "mysidenav active" : "mysidenav"}>
                <img src={require("../../Images/logo_ 2.png")} 
                alt="logo"
                className="logo"
                />
                <ul class="fa-ul">
                    {SidebarItems.map((item, index) => (
                        <li key={index}>
                            <span className="fa-li"><i className={item.icon}></i></span>
                            <Link to={item.path} className="Link">{item.label}</Link>
                        </li>
                    ))}
                </ul>
                <main className="contentt">{children}</main>    
            </div>    
            {/* <main className="contentt">{children}</main>                */}
        </div>
        // {/* <SideNav
        //             onSelect={selected => {
        //                 console.log(selected);
        //                 navigate('/' + selected);
        //             }}
        //             className='mysidenav'
        //         >
        //             <div className="logo">
        //                 <img className="logo" src={require("C:/Users/mrput/Documents/VSProject/POS_Piece-Of-Software/Frontend/pos/src/components/logo_ 2.png")} alt="Stock | Product" style={{ height: 'auto', width: 'auto' }} />
        //             </div>
        //             <SideNav.Toggle onClick={handleToggle} />
        //             <SideNav.Nav defaultSelected="Stock">
        //                 <NavItem eventKey="Dashboard" style={{ margin: '45px 0px 0px' }}>
        //                     <NavIcon><i class="fa-solid fa-table-columns"></i></NavIcon>
        //                     <NavText>Dashboard</NavText>
        //                 </NavItem>
        //                 <NavItem eventKey="Stock">
        //                     <NavIcon><i class="fa-solid fa-database"></i></NavIcon>
        //                     <NavText>Stock</NavText>
        //                 </NavItem>
        //                 <NavItem eventKey="Logout" style={{ position: 'absolute', display: 'flex', bottom: 0 }}>
        //                     <NavIcon><i class="fa-solid fa-arrow-right-from-bracket"></i></NavIcon>
        //                     <NavText>Log out</NavText>
        //                 </NavItem>
        //             </SideNav.Nav>
        //         </SideNav> */}
    );
}

export default Nav;