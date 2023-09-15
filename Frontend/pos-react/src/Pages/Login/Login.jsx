import React from "react";
import './Login.css';
import {useNavigate} from 'react-router-dom';

function Login(props) {
    const navigate = useNavigate();

    const navigateStock = () => {
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
                            <input type="text" id="fname" name="fname" />
                        </div>
                        <div>
                            <div class="forgot-div">
                                <label for="password" class="l1"><span >Password</span></label>
                                {/* <div class="a-div"><a href="">forgot?</a></div> */}
                            </div>
                            <input type="password" id="password" name="password" />
                        </div>
                    </form>
                    <br></br>
                    <button class="reg-btn" onClick={navigateStock}>Sign in</button>
                </div>
                {/* <div class="div-reg"><span >Don't have an account? </span><a href="" >Sign up</a></div> */}
                
            </div>
        </div>
    </div>
    
        // โฟรท์,    เปลี่ยน HTML elements ต่างๆในนี้ให้มีปุ่มต่างๆ เเบบที่มึงเห็นในเว็บหน้าล็อกอินตาม figma
    );
}
export default Login;