import React from "react";
import './payment.css'; // Import your CSS file here

function Payment(props) {
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
                </div>
                <div className="payment">
                    <div className="top-right">
                        <p><i className="bi bi-person-circle"></i>
                            &nbsp;
                            <i className="bi bi-bell-fill"></i>&nbsp; Puttichad</p> {/* You would put variables here */}
                    </div>
                    <div className="total">
                        <p className="total-text">Total: $6000</p>
                    </div>
                    <button type="submit" className="btn btn-default" style={{ color: 'white', fontWeight: 400, backgroundColor: 'black', width: '60%', margin: '10% 10% 4% 20%', borderRadius: '11px', padding: '3%' }}>QR CODE</button>
                    <div className="frame-qr">
                        <img className="qr-image" src="qr.png" alt="QR Code" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Payment;
