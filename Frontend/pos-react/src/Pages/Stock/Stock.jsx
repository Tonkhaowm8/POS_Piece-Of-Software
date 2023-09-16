import React, { useState, useEffect } from "react";
import RightSidebar from '../ShoppingCart/ShoppingCart.jsx';
import './Stock.css';

function Stock(props) {
    // Define a state variable to store the data
    const [dataObject, setDataObject] = useState({});

    useEffect(() => {
        // Fetch the data from the API URL
        fetch('http://localhost:4000/api/items')
            .then((response) => {
                // Check if the response status is OK (status code 200)
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                // Parse the response body as JSON
                return response.json();
            })
            .then((data) => {
                // Update the dataObject state with the fetched data
                setDataObject(data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []); // The empty dependency array ensures this effect runs once on component mount

    return (
        <div className="stock-Background">
            <div className="scrollable-content" id="bacc">
                <div className="dropdown" style={{textAlign: 'center'}}>
                    <h2>All products</h2>
                </div>
                <div className="button-container">
                    <button type="button" className="buttonn"  onClick={handleButtonClick}>Button 1</button>
                    <button type="button" className="buttonn"  onClick={handleButtonClick}>Button 2</button>
                </div>
                <div className="card-container">
                    <div className="flex">
                        {Array.from({ length: 36 }).map((_, index) => (
                            <div className="flex-item" key={index}>
                                <div key={index} className="card">
                                <h3>Item {index + 1}</h3>
                                <p>Description of Item {index + 1}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

function handleButtonClick() {
    // Perform actions when the button is clicked
    alert('Button Clicked!');
    // You can add more logic or state updates here
}

export default Stock;
