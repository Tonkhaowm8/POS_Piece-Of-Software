import React, { useState, useEffect } from "react";
import Nav from "../components/SideNav";
import RightSidebar from './CalculatePrice';
import './Stock.css';


function Stock(props) {
    // Define a variable to store the data
    let dataObject = {};

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
        // Assuming the response data is a single object
        // Assign the data to the dataObject variable
        dataObject = data;
        
        // Now, you can use the dataObject with the fetched data
        console.log(dataObject);
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });

    return(
        <div className="page"  class="stock-background row" >
            <div class="col-sm uni1">
                <div class="margin-topnav">
                    <h3>All products</h3>
                </div>
                {/* <div>
                    {Array.isArray(items)
                        ? items.map(element => {
                            return <h2>{element}</h2>;
                        })
                    : null}
                </div> */}
                <h2>Stock page</h2>
                {/* <ul>
                {items.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul> */}
                
            </div>
            <div class="col-sm uni2">
                <div class="margin-topnav">
                    <h3>Carts</h3>
                </div>
            </div>
            
        </div>
    );
}
export default Stock;