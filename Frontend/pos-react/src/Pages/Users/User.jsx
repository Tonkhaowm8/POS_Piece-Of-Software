import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Nav from "../../Components/SideNav/SideNav.jsx";
import './User.css';


function Users(props)   {

    const [searchTerm, setSearchTerm] = useState("");
    const [dashboardData, setDashboardData] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newUserData, setNewUserData] = useState({
        username: '',
        name: '',
        password: '',
        status: 'Employee',
    });
    const [showDeletePopover, setShowDeletePopover] = useState(false);
    const [deleteUsername, setDeleteUsername] = useState(null);


    // Function to fetch data from the API using Axios
    const fetchData = async () => {
        try {
            const response = await axios.get('/api/dashboard');
            setDashboardData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
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

    // Function to Register new user into db
    const handleInputChange = (e) => {
        setNewUserData({
            ...newUserData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAddUser = async () => {
        try {
            const response = await axios.post('/api/register', newUserData);
            if (response.data.success) {
                // Refresh the user list
                fetchData();
                // Close the modal
                setShowModal(false);
            } else {
                console.error('User registration failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleModalClick = (e) => {
        // Prevent closing the modal when clicking inside the modal content
        e.stopPropagation();
    };

    const handleDeleteClick = (username) => {
        setDeleteUsername(username);
        setShowDeletePopover(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            // Perform the deletion logic here using the username
            const response = await axios.delete(`/api/user/${deleteUsername}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.data.success) {
                // Refresh the user list
                fetchData();
            } else {
                console.error('User deletion failed:', response.data.message);
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        } finally {
            // Reset state after deletion
            setShowDeletePopover(false);
            setDeleteUsername(null);
        }
    };

    const handleDeleteCancel = () => {
        setShowDeletePopover(false);
        setDeleteUsername(null);
    };

    // Assuming there's a function to get the current user's status based on their username
    // const getCurrentUserStatus = (username) => {
    //     if (Array.isArray(dashboardData.Ppl)) {
    //       for (let i = 0; i < dashboardData.Ppl.length; i++) {
    //         const user = dashboardData.Ppl[i];
    //         if (user.username == username) {
    //           return user.status;
    //         }
    //         console.log("USERS: ", user)
    //       }
    //     }
    //     return null;
    // };
    

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
                    <button className="btn btn-warning" type="button" onClick={() => setShowModal(true)}>Add User</button>
                    {/* Modal for adding a new user */}
                    {showModal && (
                        <div className="modal" tabIndex="-1" role="dialog" onClick={handleCloseModal} style={{ display: 'block' }}>
                            <div className="modal-dialog" role="document" style={{ maxWidth: '520px' }} onClick={handleModalClick}>
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Add New User</h5>
                                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal(false)}>
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        {/* Input fields for new user data */}
                                        <div className="form-group">
                                            <label htmlFor="username">Username</label>
                                            <input type="text" className="form-control" id="username" name="username" value={newUserData.username} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input type="text" className="form-control" id="name" name="name" value={newUserData.name} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" name="password" value={newUserData.password} onChange={handleInputChange} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="status">Status</label>
                                            <select className="form-control" id="status" name="status" value={newUserData.status} onChange={handleInputChange}>
                                                <option value="Employee">Employee</option>
                                                <option value="Admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-primary" onClick={handleAddUser}>
                                            Add User
                                        </button>
                                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal(false)}>
                                            Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}


                    {/* {getCurrentUserStatus(props.username) === 'Admin' ? (
                        <button className="btn btn-warning" type="button">
                        Add User
                        </button>
                    ) : (
                        <button className="btn btn-warning" type="button" disabled>
                        Add User
                        </button>
                    )} */}
                </div>
            </div>

            {/* Popover for deleting a user */}
            {showDeletePopover && (
                <div className="popover-container">
                    <div className="popover">
                        <p>Are you sure you want to delete this user?</p>
                        <button className="btn btn-danger" onClick={handleDeleteConfirm}>
                            Confirm
                        </button>
                        <button className="btn btn-secondary" onClick={handleDeleteCancel}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}

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
                                    <div className='col-3' onClick={() => handleDeleteClick(user.username)}>
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