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
        <div className="page" class="stock-Background row">
            <div className="scrollable-content">
                <div className="dropdown">
                    <h2>Dropdown Title</h2>
                </div>
                <div className="button-container">
                    <button className="button">Button 1</button>
                    <button className="button">Button 2</button>
                </div>
                <div className="card-container">
                    {Array.from({ length: 9 }).map((_, index) => (
                        <div key={index} className="card">
                        <h3>Item {index + 1}</h3>
                        <p>Description of Item {index + 1}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Stock;
