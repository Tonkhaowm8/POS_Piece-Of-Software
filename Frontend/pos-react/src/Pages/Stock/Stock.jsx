import React, { useState, useEffect } from "react";
// import RightSidebar from '../ShoppingCart/ShoppingCart.jsx';
import ProductModal from "../../ProductModal/ProductModal.jsx";
import './Stock.css';

function Stock(props) {
    // Define a state variable to store the data
    const [dataObject, setDataObject] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    console.log(dataObject)
    // const setDataObject = useState({});
    // const dataObject = [
    //     {"Profit":300,"Price":1000,"Stock":10,"Product Name":"Baking powders","id":3},
    //     {"Profit":400,"Price":2000,"Stock":10,"Product Name":"Naku Weed","id":4},
    //     {"Profit":250,"Price":1000,"Stock":8,"Product Name":"Sugars","id":5},
    //     {"Profit":250,"Price":1000,"Stock":8,"Product Name":"Sugars","id":5},
    // ];  // replace with this dataObject for now, until the nodejs server can fetch multiple items from server

    const [selectedItem, setSelectedItem] = useState(null);

    const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
    };

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
            <div className="scrollable-content" id="bacc" style={{backgroundColor:'rgb(230, 225, 225)',boxShadow:'0px 5px 8px 0px rgba(0, 0, 0, 0.5)'}}>
                <div className="selection">
                <h3
                    className={selectedItem === "All products" ? "selected" : ""}
                    onClick={() => handleItemClick("All products")}
                    id="href3"
                >
                    All products
                </h3>
                <h3
                    className={selectedItem === "Foods" ? "selected" : ""}
                    onClick={() => handleItemClick("Foods")}
                    id="href3"
                >
                    Foods
                </h3>
                <h3
                    className={selectedItem === "Beverages" ? "selected" : ""}
                    onClick={() => handleItemClick("Beverages")}
                    id="href3"
                >
                    Beverages
                </h3>
                <h3
                    className={selectedItem === "Fashion" ? "selected" : ""}
                    onClick={() => handleItemClick("Fashion")}
                    id="href3"
                >
                    Fashion
                </h3>
                <h3
                    className={selectedItem === "Cleaners" ? "selected" : ""}
                    onClick={() => handleItemClick("Cleaners")}
                    id="href3"
                >
                    Cleaners
                </h3>
                <h3
                    className={selectedItem === "Other" ? "selected" : ""}
                    onClick={() => handleItemClick("Other")}
                    id="href3"
                >
                    Other
                </h3>
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
                                    <span style={{fontFamily:'Inter',fontWeight:'bold'}}>Item pic {index + 1}</span>
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
            <div className="scrollable-content">
                <div style={{padding:'0 15px'}}>

                </div>
            </div>
            
            {/* padding left-right can only 70px */}
            <div className="scrollable-content" style={{boxShadow:'0px 5px 8px 0px rgba(0, 0, 0, 0.5)',backgroundColor:'rgb(230, 225, 225)'}}>   
                <div className="checkOut">
                    <span style={{fontFamily:'Inter',fontWeight:'initial',fontSize:'1.875em'}}>Checkout</span>
                </div>
                <div style={{overflow:'auto',overflowX:'hidden',maxHeight:'50%'}}>
                    {/* TO replace with some datamapping, idk (using actual data from dynamoDB) */}
                    <div className="stackblock">
                        {/* <h3>Checkout1</h3>
                        <h3>CHeckout2</h3>
                        <h3>Checkout3</h3>
                        <h3>Checkout3</h3>
                        <h3>Checkout3</h3>
                        <h3>Checkout3</h3>
                        <h3>Checkout3</h3> */}
                    </div>
                </div>
                <div style={{margin:'25px 5px',borderRadius:'8px'}}>
                    <div className="inflex">
                        <span style={{textAlign:'center',fontFamily:'Inter',fontSize:'1.4em',marginRight:'120px'}}>Add</span>
                        <div style={{padding:'2.8px 22px'}}>
                            <a href="#" className="discunt">Discount</a>
                            <a href="#" className="discunt">Note</a>
                        </div>
                    </div>
                </div>
                <div className="cuntainer" style={{backgroundColor:'white'}}>
                    <div className="litem">Subtotal</div>
                    <div className="litem">Item 2 (Right)</div>
                    <div className="litem">Tax</div>
                    <div className="litem">Item 4 (Right)</div>
                    <div className="litem"><b>Payable Amount</b></div>
                    <div className="litem">Item 6 (Right)</div>
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
