import React, { useState, useEffect } from "react";
import Nav from "../../Components/SideNav/SideNav.jsx";
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
            <div class="col-sm">
                <div class="margin-topnav">
                    <h3>All products</h3>
                </div>
                {/* Display the dataObject */}
                <div>
                    <h2>Stock page</h2>
                    {/* Access properties of dataObject */}
                    <p>
                        Product Name: {dataObject["Product Name"]} <br></br>
                        Stock: {dataObject.Stock} <br></br>
                        Price: {dataObject.Price} <br></br>
                        ID: {dataObject.id} <br></br>
                    </p>
                </div>
            </div>
            {/* <div class="col-sm uni2">
                <div class="margin-topnav">
                    <h3>Carts</h3>
                </div>
            </div> */}
        </div>
    );
}

export default Stock;
