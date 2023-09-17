import React, { useState, useEffect } from "react";
import RightSidebar from '../ShoppingCart/ShoppingCart.jsx';
import ProductModal from "../../ProductModal/ProductModal.jsx";
import './Stock.css';

function Stock(props) {
    // Define a state variable to store the data
    // const [dataObject, setDataObject] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

    const setDataObject = useState({});
    const dataObject = [
        {"Profit":300,"Price":1000,"Stock":10,"Product Name":"Baking powders","id":3},
        {"Profit":400,"Price":2000,"Stock":10,"Product Name":"Naku Weed","id":4},
        {"Profit":250,"Price":1000,"Stock":8,"Product Name":"Sugars","id":5},
        {"Profit":250,"Price":1000,"Stock":8,"Product Name":"Sugars","id":5},
    ];  // replace with this dataObject for now, until the nodejs server can fetch multiple items from server

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
                    <button type="button" className="buttonn"  onClick={() => setIsModalOpen(true)}><p>Add Product</p></button>
                    <button type="button" className="buttonn"  onClick={handleButtonClick}><p>Edit Product</p></button>
                </div>
                <div className="card-container" >
                    <div className="flex">
                        {/* Map over dataObject and create card elements */}
                        {dataObject.map((item, index) => (
                            <div className="flex-item" key={index}>
                                <div className="card">
                                    <h3>Item pic {index + 1}</h3>
                                    <p>"{item["Product Name"]}"</p>
                                    <p>Stock: {item.Stock}</p>
                                    <p>Price: {item.Price}</p>
                                    <p>ID: {item.id}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Conditionally render the modal */}
            <ProductModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
}

function handleButtonClick() {
    // Perform actions when the button is clicked
    alert('Button Clicked!');
    // You can add more logic or state updates here
}

export default Stock;
