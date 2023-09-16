import React, { useState } from "react";
import './Login.css';
import {useNavigate} from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    // State variables for username and password
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigateStock = () => {
        // Get the current values of username and password
        const currentUsername = username;
        const currentPassword = password;

        console.log(currentUsername)
        console.log(currentPassword)

        // navigate to stock after logging in imediately 
        navigate('/stock');
    };

    return(
        <div class="big">

        <div class="left">
        </div>

        <div class="right">
            <div class="menu">
                <div class="size-50"><span>Sign in to </span><span class="color">Stock</span><span class="color1">│</span><span>Dashboard</span></div>
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

export default Login;
