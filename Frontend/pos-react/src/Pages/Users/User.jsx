import React, { useState, useEffect } from 'react';
import Nav from "../../Components/SideNav/SideNav.jsx";
import './User.css';


function Users(props)   {

    const [searchTerm, setSearchTerm] = useState("");

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
                <input type="text" class="form-control" placeholder="Search User" aria-label="Search User" ></input>
                <div class="input-group-append">
                    <button class="btn btn-warning" type="button">Add User</button>
                </div>
            </div>

            {/* Scrollable Container for User List */}
            <div className="scrollable-container" style={{height: '500px', overflowY: 'auto'}}>
                <ul className="list-group">
                    {/* Sample user items, replace with actual user data */}
                    <li className="list-group-item custom-hover" style={{ backgroundColor: '#f2f2f2' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Username</h5>
                            </div>
                            <div>
                                <small className="text-muted">Actual Name</small>
                            </div>
                            <span >Admin</span>
                            <button className="btn btn-danger btn-sm">Delete member</button>
                        </div>
                    </li>
                    <li className="list-group-item custom-hover" style={{ backgroundColor: '#f2f2f2' }}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <h5 className="mb-0">Username</h5>
                            </div>
                            <div>
                                <small className="text-muted">Actual Name</small>
                            </div>
                            <span >Admin</span>
                            <button className="btn btn-danger btn-sm">Delete member</button>
                        </div>
                    </li>
                    {/* Add more user items as needed */}
                </ul>
            </div>
        </div>
    )
}

export default Users