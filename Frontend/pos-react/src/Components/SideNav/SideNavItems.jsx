import { FaTable, FaDatabase } from 'react-icons/fa';
import { BiLogOut } from 'react-icons/bi';
import { FaUsersCog } from 'react-icons/fa'

const SidebarItems = [
    { path: '/dashboard', label: 'Dashboard', icon: <FaTable/> },
    { path: '/stock', label: 'Stock', icon: <FaDatabase/> },
    { path: '/users', label: 'User Management', icon: <FaUsersCog/>},
    { path: '/logout', label: 'Log out', icon: <BiLogOut/>},
    // Add more items as needed
  ];
  

export default SidebarItems;