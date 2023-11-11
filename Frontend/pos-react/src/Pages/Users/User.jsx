import React, { useState, useEffect } from 'react';
import Nav from "../../Components/SideNav/SideNav.jsx";
import './User.css';


function Users(props)   {

    const [searchTerm, setSearchTerm] = useState("");
    const [dashboardData, setDashboardData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);

    useEffect(() => {
        // Function to fetch data from the API
        const fetchData = async () => {
            try {
            const response = await fetch('/api/dashboard');
            if (response.ok) {
                const data = await response.json();
                setDashboardData(data);
                console.log(data)
            } else {
                console.error('Failed to fetch data');
            }
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };
        // Call the fetchData function when the component mounts
        fetchData();
    }, []);

    useEffect(() => {
        const filterUsers = () => {
            if (Array.isArray(dashboardData.Ppl)) {
                const filtered = dashboardData.Ppl.filter(user =>
                    user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.name.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredUsers(filtered);
            }
        };

        filterUsers();
    }, [searchTerm, dashboardData.Ppl]);

    // Assuming there's a function to get the current user's status based on their username
    const getCurrentUserStatus = (username) => {
        if (Array.isArray(dashboardData.Ppl)) {
          for (let i = 0; i < dashboardData.Ppl.length; i++) {
            const user = dashboardData.Ppl[i];
            if (user.username == username) {
              return user.status;
            }
            console.log("USERS: ", user)
          }
        }
        return null;
    };
    

    // const handleStatusChange = async (userName, newStatus) => {
    //     // Update the user status in the UI
    //     const updatedUsers = filteredUsers.map(user => {
    //         if (user.username === userName) {
    //             return { ...user, status: newStatus };
    //         }
    //         return user;
    //     });
    //     setFilteredUsers(updatedUsers);

    //     // Send a request to update the user status in the database
    //     try {
    //         const response = await fetch(`/api/dashboard/${userName}`, {
    //             method: 'PUT',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ status: newStatus }),
    //         });

    //         if (!response.ok) {
    //             console.error('Failed to update user status in the database');
    //             // Rollback the status change in the UI if the database update fails
    //             setFilteredUsers(filteredUsers);
    //         }
    //     } catch (error) {
    //         console.error('Error updating user status:', error);
    //         // Rollback the status change in the UI if there is an error
    //         setFilteredUsers(filteredUsers);
    //     }
    // };

    // console.log("Status: ",dashboardData.Ppl)

    return(
        <div className='user-bg' style={{padding:'10px'}}>
            {/* Top Navbar */}
            <div className="container-fluid d-flex justify-content-between align-items-center" style={{padding:'10px 0'}}>
                <h3>User Setting</h3>
                {/* <form className="d-flex justify-content">
                    <input
                        className="form-control me-2"
                        type="search"
                        placeholder="Search"
                        aria-label="Default"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="gap-2"></div>
                    <div class="input-group-append">
                        <button className="btn btn-outline-secondary btn-sm" type="button">Search</button>
                    </div>
                </form> */}
            </div>
            <div class="input-group mb-3">
                <input 
                type="text" 
                class="form-control" 
                placeholder="Search User" 
                aria-label="Search User" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                ></input>
                <div class="input-group-append">
                    {getCurrentUserStatus(props.username) === 'Admin' ? (
                        <button className="btn btn-warning" type="button">
                        Add User
                        </button>
                    ) : (
                        <button className="btn btn-warning" type="button" disabled>
                        Add User
                        </button>
                    )}
                </div>
            </div>

            {/* Scrollable Container for User List */}
            <div className="scrollable-container" style={{height: '500px', overflowY: 'auto'}}>
                {Array.isArray(filteredUsers) && filteredUsers.length > 0 ? (
                <div className="scrollable-container" style={{ height: '500px', overflowY: 'auto' }}>
                    <ul className="list-group">
                        {filteredUsers.map((user, index) => (
                            <li className="list-group-item custom-hover" key={index}>
                                <div className="row">
                                    <div className='col-3'>
                                        <h5 className="mb-0">{user.username}</h5>
                                    </div>
                                    <div className='col-4'>
                                        <small className="text-muted">{user.name}</small>
                                    </div>
                                    <div className='col-2'>
                                        <select
                                            value={user.status}
                                            // onChange={(e) => handleStatusChange(user.username, e.target.value)}
                                        >
                                            <option value="Employee">Employee</option>
                                            <option value="Admin">Admin</option>
                                        </select>
                                    </div>
                                    <div className='col-3'>
                                        <button className="btn btn-danger btn-sm">Delete member</button>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
                ) : (
                    <tr>
                        <td colSpan="3">No data available</td>
                    </tr>
                )}
            </div>
        </div>
    )
}

export default Users