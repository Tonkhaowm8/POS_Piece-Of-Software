import React, { useState } from "react";
// import styled from 'styled-components';
// import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import './SideNav.css';
// import { FaTableColumns, FaDatabase, BiLogOut } from 'react-icons';
import { useNavigate, Link } from "react-router-dom";
import SidebarItems from "./SideNavItems";



function Nav({show, children}) {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };
    
    // const navigate = useNavigate();
    // style={{position: 'fixed'}}
    return (
        <div className="sidenav"> 
            <div className={show ? "mysidenav active" : "mysidenav"}>
                <img src={require("../../Images/logo_ 2.png")} 
                alt="logo"
                className="logo"
                style={{paddingTop:'50px'}}
                />
                <ul class="fa-ull">
                    {SidebarItems.map((item, index) => (
                        <li key={index} style={{display:'flex'} /* no display: flex */} >
                            <Link to={item.path} style={{color: "#eaecef"}}><span className="fa-li"><i className="icon" style={{fontSize:'large'}}>{item.icon}</i></span></Link>
                            <Link to={item.path} className="Link">{item.label}</Link>
                        </li>
                    ))}
                </ul>
                {/* <main className={show ? "contentt active" : "contentt"}>{children}</main>     */}
            </div>    
            <main className={show ? "contentt active" : "contentt"}>{children}</main>
        </div>
        
    );
}

export default Nav;