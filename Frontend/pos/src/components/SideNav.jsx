import React, { useState } from "react";
import styled from 'styled-components';
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import { useNavigate } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";  
import SidebarItems from "./SideNavItems";
import logo from '../../src/';


function Nav() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();

    const handleToggle = () => {
        setExpanded(!expanded);
    };
    return (
        <div className="top_navbar">
            <div className={`sidebar-container ${expanded ? 'expanded' : ''}`}>
                <div className="logo">
                    <img src={require("src/components/logo_2.png")} alt="Stock | Product" style={{ height: 'auto', width: 'auto' }} />
                </div>
                <SideNav
                    onSelect={selected => {
                        console.log(selected);
                        navigate('/' + selected);
                    }}
                    className='mysidenav'
                >
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
                </SideNav>
            </div>
        </div>
    );
}

export default Nav;