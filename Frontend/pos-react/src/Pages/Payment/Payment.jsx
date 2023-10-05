import React, { useState, useEffect } from "react";
import './payment.css'; // Import your CSS file here
import { useLocation } from "react-router-dom";

function Payment(props) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const username = queryParams.get("username");
    const totalPrice = queryParams.get("totalPrice");
    const products = [];

    // Retrieve product data from query parameters
    queryParams.forEach((value, key) => {
        if (key === "product") {
            products.push({ name: value });
        } else if (key === "price") {
            const lastIndex = products.length - 1;
            products[lastIndex].price = value;
        } else if (key === "quantity") {
            const lastIndex = products.length - 1;
            products[lastIndex].quantity = value;
        } else if (key === "id") {
            const lastIndex = products.length - 1;
            products[lastIndex].id = value;
        }
    });

    useEffect(() => {
        // Log the received values
        console.log("Username:", username);
        console.log("Products:", products);
        console.log("Total Price:", totalPrice);
    }, []); // This will run once when the component mounts

    // Function to format the price
    const formatPrice = (price) => {
        return `$${parseFloat(price).toFixed(2)}`;
    };

    // Generate product elements for the receipt
    const productElements = products.map((product, index) => (
        <div className="product" key={index}>
            <p className="name">{product.name}</p>
            <p className="price">{formatPrice(product.price)}</p>
            <p className="quantity">Qty: {product.quantity}</p>
        </div>
    ));

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

    // Function to send data to the server
    const sendDataToServer = () => {
        // Create an object with the data to send
        const dataToSend = {
            username: username,
            totalPrice: totalPrice,
            products: products,
        };

        // Send the data to the server
        fetch('http://localhost:4000/api/cart', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToSend),
        })
        .then(response => {
            if (response.ok) {
                console.log('Data sent successfully.');
            } else {
                console.error('Failed to send data.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
        
        // Navigate back to the stock page
        window.location.href = "/stock"; // Replace "/stock" with the actual path of your stock page
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
                        {productElements}
                    </div>
                    <button className="payment-done-btn" onClick={sendDataToServer}>Transaction Complete</button>
                </div>
                <div className="payment">
                    <div className="total">
                        <p className="total-text">Total: {formatPrice(totalPrice)}</p>
                    </div>
                    <button
                        type="submit"
                        className="qr-btn"
                        style={{ color: 'white', fontWeight: 400, backgroundColor: 'black', width: '60%', margin: '0% 10% 4% 20%', borderRadius: '11px', padding: '3%' }}
                        onClick={toggleQR} // Toggle QR visibility on button click
                        >QR CODE
                    </button>
                    {/* Step 2: Render the QR frame conditionally */}
                    {renderQRFrame()}
                </div>
            </div>
        </div>
    );
}

export default Payment;
