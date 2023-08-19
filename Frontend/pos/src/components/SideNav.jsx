import React from "react";
import styled from 'styled-components';
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import "@trendmicro/react-sidenav/dist/react-sidenav.css";  


function Nav() {
    return(
        <SideNav
         onSelect={selected => {
            console.log(selected)
         }}
        >
            <SideNav.Toggle />
            <SideNav>
                <NavItem>
                    <i class="fa-solid fa-table-columns"></i>
                    <p>Dashboard</p>
                </NavItem>
                <NavItem>
                    <i class="fa-solid fa-boxes-stacked"></i>
                    <h2>Stock</h2>
                </NavItem>
                <NavItem>
                    <i class="fa-solid fa-arrow-right-from-bracket"></i>
                    <h2>Log out</h2>
                </NavItem>
            </SideNav>
        </SideNav>
    );
}

export default Nav;