import { FaTable, FaDatabase } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';

const SidebarItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaTable/> },
    { path: '/stock', label: 'Stock', icon: <FaDatabase/> },
    { path: '/logout', label: 'Log out', icon: <BiLogOut/>},
    // Add more items as needed
  ];
  

export default SidebarItems;