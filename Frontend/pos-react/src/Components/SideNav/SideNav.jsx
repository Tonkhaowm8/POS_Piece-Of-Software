import React, { useState, useEffect } from "react";
// import styled from 'styled-components';
// import {Sidebar, InputItem, DropdownItem, Icon, Item, Logo, LogoText} from 'react-sidebar-ui'
import './SideNav.css';
// import { FaTableColumns, FaDatabase, BiLogOut } from 'react-icons';
import { Link, useLocation } from "react-router-dom";
import SidebarItems from "./SideNavItems";



function Nav({show, children}) {
    // const [isOpen, setIsOpen] = useState(false);

    // const toggleSidebar = () => {
    //     setIsOpen(!isOpen);
    // };
    
    const location = useLocation();
    const [expandOnLogout, setExpandOnLogout] = useState(false);

    useEffect(() => {
        if (location.pathname === '/logout') {
        // Set expandOnLogout to true when the "/logout" link is clicked
        setExpandOnLogout(true);
        }
    }, [location.pathname]);

    // Check if the current path is Stock or Dashboard
    const isStockOrDashboard = ['/stock', '/dashboard'].includes(location.pathname);

    // Render the sidebar only if the current route is Stock or Dashboard
    const renderSidebar = isStockOrDashboard || show || expandOnLogout;

    return (
        <div className="sidenav"> 
            {renderSidebar && (
                <div className={show || expandOnLogout ? "mysidenav active" : "mysidenav"}>
                    <img src={require("../../Images/new_logo.png")} 
                    alt="logo"
                    className="logo"
                    style={{paddingTop:'50px',height:'120px',width:'230px'}}
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
            )}   
            <main className={show ? "contentt active" : "contentt"}>{children}</main>
        </div>
        
    );
}

export default Nav;