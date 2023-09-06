import React from "react";
import styled from 'styled-components';
import SideNav, {Toggle, NavItem, NavIcon, NavText} from '@trendmicro/react-sidenav';
import { useNavigate } from "react-router-dom";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";  
import SidebarItems from "./SideNavItems";
// import logo_2 from './pos/public/logo_ 2.png';

// const SidebarParent = styled.div`
//   background: #c34a36;
//   width: 250px;
//   height: 100vh;
// `;

// const SidebarItem = styled.div`
//   padding: 16px 24px;
//   transition: all 0.25s ease-in-out;
//   //Change the background color if 'active' prop is received
//   background: ${props => props.active ? "#b15b00" : ""};
//   margin: 4px 12px;
//   border-radius: 4px;

//   p {
//     color: white;
//     font-weight: bold;
//     text-decoration: none;
//   }

//   &:hover {
//     cursor:pointer;
//   }

//   &:hover:not(:first-child) {
//     background: #c34a36;
//   }
// `;

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