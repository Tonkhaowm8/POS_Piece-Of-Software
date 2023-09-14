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
                <main className={show ? "contentt active" : "contentt"}>{children}</main>    
            </div>    
            {/* <main className="contentt">{children}</main>                */}
        </div>
        
    );
}

export default Nav;