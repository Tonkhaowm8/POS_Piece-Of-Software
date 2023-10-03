import React from "react";
import Nav from "../../Components/SideNav/SideNav";
import './payment.css';
import './bootstrap.css';

function Payment(props) {
    return (
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width">
          <title>replit</title>
          <link href="lol.css" rel="stylesheet" type="text/css" />
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
              <!-- Google Web Fonts -->
              <link rel="preconnect" href="https://fonts.gstatic.com">
              <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet">  
              <!-- Icon Font Stylesheet -->
              <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.0/css/all.min.css" rel="stylesheet">
              <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.4.1/font/bootstrap-icons.css" rel="stylesheet">  
        </head>
        <body>
                <div class="sidebar">
                    <div class="con1">
                        <span class="style1">Stock|</span>Dashboard</p>
                    </div>
                    <div class="con2">
                        <button type="button" class="btn btn-default bi bi-layout-text-window-reverse" style="color: white;"> &nbsp Dashboard </button>
                    </div>
                    <div class="con2">
                        <button type="button" class="btn btn-default bi bi-cart3" style="color: white;"> &nbsp Stock </button>
                    </div>
                    <div class="con3">
                        <button type="button" class="btn btn-default bi bi-arrow-bar-right " style="color: white;"> &nbsp Log out </button>
                    </div>
                </div>
                <div class="display">
                    <div class="proprietary">
                        <div class="billing-payment">
                            <i class="bi bi-credit-card"></i>
                            &nbsp Billing-Payment
                        </div>
                        <div class="product-cont">
                            <div class="product">
                                <p class="name">Product Name</p> <!-- You would put variables here-->
                                <p class="price">$60.02</p> <!-- You would put variables here-->
                            </div>
                            <div class="product">
                                <p class="name">Product Name</p> <!-- You would put variables here-->
                                <p class="price">$60.02</p> <!-- You would put variables here-->
                            </div>
                            <div class="product">
                                <p class="name">Product Name</p> <!-- You would put variables here-->
                                <p class="price">$60.02</p> <!-- You would put variables here-->
                            </div>
                            <div class="product">
                                <p class="name">Product Name</p> <!-- You would put variables here-->
                                <p class="price">$60.02</p> <!-- You would put variables here-->
                            </div> 
                        </div>
                    </div>
                    <div class="payment"> 
                        <div class="top-right">
                            <p><i class="bi bi-person-circle"></i>
                              &nbsp 
                              <i class="bi bi-bell-fill"></i>&nbsp Puttichad</p> <!-- You would put variables here-->
                        </div>
                        <div class="total"> 
                            <p class="total-text">Total: $6000</p>
                        </div>
                        <button type="submit" class="btn btn-default" style="color: white; font-weight: 400; background-color: black; width: 60%; margin: 10% 10% 4% 20%; border-radius: 11px; padding: 3%;">QR CODE</button>
                        <div class="frame-qr">
                            <img class="qr-image" src="qr.png">
                        </div>
                    </div>
                </div>
        </body>
        </html>
    );
}

export default Payment;
