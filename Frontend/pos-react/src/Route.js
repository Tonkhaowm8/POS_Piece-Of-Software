// import React from "react";
// import {BrowserRouter, Route, Router, Switch} from "react-router-dom";
// import {
//     Routes,
//     createBrowserRouter,
//     RouterProvider,
// } from "react-router-dom";
// import Dashboard from "./pages/Dashboard";
// import Stock from './pages/Stock';

// function Routee() {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Stock />} />
//                 <Route path="/stock" element={<Stock />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//             </Routes>
//         </Router>
//     )
// }

// export default Routee;

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