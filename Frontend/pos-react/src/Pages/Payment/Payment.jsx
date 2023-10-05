import React, { useState } from "react";
import './payment.css'; // Import your CSS file here

function Payment(props) {
    // Step 1: Add a state variable to track the QR code button click
    const [showQR, setShowQR] = useState(false);

    // Step 2: Conditionally render the QR frame based on the state variable
    const renderQRFrame = () => {
        if (showQR) {
            return (
                <div className="frame-qr">
                    <img className="qr-image" src={require("../../Images/qr_mill.jpg")} alt="QR Code" />
                </div>
            );
        }
        return null;
    };

    // Toggle QR visibility when the QR code button is clicked
    const toggleQR = () => {
        setShowQR(!showQR);
    };

    return (
        <div className="container">
            <div className="display">
                <div className="proprietary">
                    <div className="billing-payment">
                        <i className="bi bi-credit-card"></i>
                        &nbsp; Billing-Payment
                    </div>
                    <div className="product-cont">
                        <div className="product">
                            <p className="name">Product Name</p> {/* You would put variables here */}
                            <p className="price">$60.02</p> {/* You would put variables here */}
                        </div>
                        <div className="product">
                            <p className="name">Product Name</p> {/* You would put variables here */}
                            <p className="price">$60.02</p> {/* You would put variables here */}
                        </div>
                        <div className="product">
                            <p className="name">Product Name</p> {/* You would put variables here */}
                            <p className="price">$60.02</p> {/* You would put variables here */}
                        </div>
                        <div className="product">
                            <p className="name">Product Name</p> {/* You would put variables here */}
                            <p className="price">$60.02</p> {/* You would put variables here */}
                        </div>
                    </div>
                    <button className="payment-done-btn">Transaction Complete</button>

                </div>
                
                <div className="payment">
                    <div className="total">
                        <p className="total-text">Total: $6000</p>
                    </div>
                    <button
                        type="submit"
                        className="qr-btn"
                        style={{ color: 'white', fontWeight: 400, backgroundColor: 'black', width: '60%', margin: '0% 10% 4% 20%', borderRadius: '11px', padding: '3%' }}
                        onClick={toggleQR} // Toggle QR visibility on button click
                    >
                        QR CODE
                    </button>
                    {/* Step 2: Render the QR frame conditionally */}
                    {renderQRFrame()}
                </div>
            </div>
        </div>
    );
}

export default Payment;
