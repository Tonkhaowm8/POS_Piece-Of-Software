import React from "react";
import styled from 'styled-components';
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import { useNavigate } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";  
import logo_2 from './pos/public/logo_ 2.png';


function Nav() {
    const navigate = useNavigate();
    return(

        <div className="top_navbar">
                <SideNav
            onSelect={selected => {
                console.log(selected)
                navigate('/'+selected)
            }}
            className = 'mysidenav'
            >
                <div class="logo">Stock</div>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="Stock">
                    <NavItem eventKey="Dashboard">
                        <NavIcon><i class="fa-solid fa-table-columns"></i></NavIcon>
                        <NavText>Dashboard</NavText>
                    </NavItem>
                    <NavItem eventKey="Stock">
                        <NavIcon><i class="fa-solid fa-database"></i></NavIcon>
                        <NavText>Stock</NavText>
                    </NavItem>
                </SideNav.Nav>

                <SideNav.Nav>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem></NavItem>
                    <NavItem eventKey="Logout">
                        <NavIcon><i class="fa-solid fa-arrow-right-from-bracket"></i></NavIcon>
                        <NavText>Log out</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        </div>
    );
}

export default Nav;