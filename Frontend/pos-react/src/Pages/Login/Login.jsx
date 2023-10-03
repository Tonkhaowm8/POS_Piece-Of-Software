import React, { useState } from "react";
import './Login.css';
import {useNavigate} from 'react-router-dom';
import { useUsername } from './UsernameContext.jsx'; // Import the useUsername hook

function Login(props) {
    const navigate = useNavigate();
    const { username, setUsername } = useUsername(); // Use the hook to get and set the username
    const [password, setPassword] = useState("");
    

    const navigateStock = async () => {
        // Get the current values of username and password
        const currentUsername = username;
        const currentPassword = password;

        // Prepare the data to send in the request body
    const dataToSend = {
        username: currentUsername,
        password: currentPassword,
    };

    try {
        // Make an HTTP POST request to your server's '/login' route
        const response = await fetch('http://localhost:4000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        });

        if (response.ok) {
            const responseData = await response.json();
            if (responseData.login) {
                // User successfully logged in
                console.log('Logged in:', responseData.user);
                // Access user data including username and cart
                const { username, cart } = responseData.user;
                console.log('Username:', username);
                console.log('Cart:', cart);
                console.log('From Login Page')
                // Redirect to '/stock' or perform other actions
                navigate('/stock');
            } else {
                // Handle login failure (wrong password)
                console.log('Login failed:', responseData.reason);
            }
        } else {
            // Handle HTTP request error
            console.error('HTTP request failed:', response.status);
        }
    } catch (error) {
        // Handle network or other errors
        console.error('An error occurred:', error);
    }

    };

    return(
        <div class="big">

        <div class="left">
        </div>

        <div class="right">
            <div class="menu">
                <div class="size-50"><span> Sign in to </span><span class="color">Stock</span><span class="color1">│</span><span>Dashboard</span></div>
                <br></br>
                {/* <div><button class="login-btn">Sign in with Google</button></div>
                
                <div class="div-text">
                    <h2>
                        <span >or sign in with email</span>
                    </h2>
                </div> */}
                <br></br>
                <div >
                    <form class="form">
                        <div>
                            <label for="fname" ><span >Username or Email</span></label>
                            <input type="text" id="fname" name="fname" value={username} onChange={(e) => setUsername(e.target.value)} /> 
                        </div>
                        <div>
                            <div class="forgot-div">
                                <label for="password" class="l1"><span >Password</span></label>
                                {/* <div class="a-div"><a href="">forgot?</a></div> */}
                            </div>
                            <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                    </form>
                    <br></br>
                    {/* Change this later on when the backend function comes: password condition things */}
                    <button class="reg-btn" onClick={navigateStock}>Sign in</button>
                </div>
                {/* <div class="div-reg"><span >Don't have an account? </span><a href="" >Sign up</a></div> */}
            </div>
        </div>
    </div>

    );
}
const username = "initialValue";

export {username}; // Export the username variable
export default Login;