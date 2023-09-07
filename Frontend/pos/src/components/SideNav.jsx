import React from "react";
import styled from 'styled-components';
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import { useNavigate } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";  
import SidebarItems from "./SideNavItems";
// import logo_2 from 'pos/src/logo_ 2.png';



function Nav() {
    const navigate = useNavigate();
    return(

        <div className="top_navbar">
            {/* <SidebarParent>
                {
                    SidebarItems.map(item=> (
                        <SidebarItem key={item.name}>
                            <p>{item.name}</p>
                        </SidebarItem>
                    ))
                }
            </SidebarParent> */}

                {/* Sidebar using SideNav components: hard to adjust*/}
                <SideNav
                onSelect={selected => {
                    console.log(selected)
                    navigate('/'+selected)
                }}
                className = 'mysidenav'
                style = {{position: 'fixed'}}
                >
                <div class="logo">
                    <img src={require('C:/Users/mrput/Documents/VSProject/POS_Piece-Of-Software/Frontend/pos/src/logo_ 2.png')} alt="Stock | Product" style={{height: 'auto', width: 'auto'}}/>
                </div>
                <SideNav.Toggle />
                <SideNav.Nav defaultSelected="Stock">
                    <NavItem eventKey="Dashboard" style={{margin: '45px 0px 0px'}}>
                        <NavIcon><i class="fa-solid fa-table-columns"></i></NavIcon>
                        <NavText>Dashboard</NavText>
                    </NavItem>
                    <NavItem eventKey="Stock">
                        <NavIcon><i class="fa-solid fa-database"></i></NavIcon>
                        <NavText>Stock</NavText>
                    </NavItem>
                    <NavItem eventKey="Logout" style={{position: 'absolute', display: 'flex',bottom: 0}}>
                        <NavIcon><i class="fa-solid fa-arrow-right-from-bracket"></i></NavIcon>
                        <NavText>Log out</NavText>
                    </NavItem>
                </SideNav.Nav>

           
            </SideNav>
        </div>
    );
}

export default Nav;