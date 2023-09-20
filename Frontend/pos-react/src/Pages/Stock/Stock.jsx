import React, { useState, useEffect } from "react";
// import RightSidebar from '../ShoppingCart/ShoppingCart.jsx';
import ProductModal from "../../ProductModal/ProductModal.jsx";
import './Stock.css';

function Stock(props) {
    // Define a state variable to store the data
    const [dataObject, setDataObject] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
    const [selectedData, setSelectedData] = useState(new Map()); // State to store selected data and quantity
    const [totalPrice, setTotalPrice] = useState(0); // State to store the total price

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

    // Function to handle card item click
    const handleCardClick = (item) => {
        setSelectedItem(item);
        setSelectedData((prevMap) => {
            const updatedMap = new Map(prevMap);
            const prevQuantity = updatedMap.get(item.id) || 0;
            updatedMap.set(item.id, prevQuantity + 1);
            return updatedMap;
        }); // Update selectedData with the clicked item's data
    };

    // Function to clear selected data
    const clearSelectedData = () => {
        setSelectedData(new Map()); // Reset the array to clear selected data
        setTotalPrice(0); // Reset the total price
    };

    // Calculate the total price based on selected data and quantities
    useEffect(() => {
        let sum = 0;
        for (const [itemId, quantity] of selectedData) {
            const selectedData = dataObject.find((item) => item.id === itemId);
            if (selectedData) {
                const itemPrice = selectedData.Price * quantity;
                sum += itemPrice;
            }
        }
        setTotalPrice(sum);
    }, [selectedData, dataObject]);

    return (
        <div className="stock-Background">
            <div className="scrollable-content" /* id="bacc" */ style={{backgroundColor:'rgb(230, 225, 225)',boxShadow:'0px 5px 8px 0px rgba(0, 0, 0, 0.5)'}}>
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
                                <div className="card" onClick={() => handleCardClick(item)}>
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
                <div style={{padding:'0 20px'}}>

                </div>
            </div>
            
            {/* padding left-right can only 70px */}
            <div className="scrollable-content" style={{boxShadow:'0px 5px 8px 0px rgba(0, 0, 0, 0.5)',backgroundColor:'rgb(230, 225, 225)'}}>   
                <div className="checkOut">
                    <span style={{fontFamily:'Inter',fontWeight:'initial',fontSize:'1.875em'}}>Checkout</span>
                    {/* Button to clear selected data */}
                    <button onClick={clearSelectedData}>Clear</button>
                </div>
                <div style={{backgroundColor:'#f2eded'}} className="stackblock">
                    {/* Display items from clicked card: default method without replacing any duplicate content */
                    /* {selectedData.map((selectedData, index) => (
                    <div key={index}>
                        <p>Product Name: {selectedData["Product Name"]}</p>
                        <p>Price: {selectedData.Price}</p>
                    </div>
                    ))} */}

                    {/* Display items from clicked card: with quantity count method */}
                    {Array.from(selectedData.keys()).map((itemId, index) => {
                    const quantity = selectedData.get(itemId);

                        return (
                            <div key={index}>
                                {/* Find the item in dataObject using its ID */}
                                {dataObject.map((item) => {
                                    if (item.id === itemId) {
                                        return (
                                            <div key={item.id}>
                                                <p>Product Name: {item["Product Name"]}</p>
                                                <p>Price: {item.Price}</p>
                                                <p>Quantity: {quantity}</p>
                                            </div>
                                        );
                                    }
                                    return null;
                                })}
                            </div>
                        );
                    })}
                </div>
                <div style={{margin:'20px 5px',borderRadius:'8px'}}>
                    <div className="inflex">
                        <span style={{textAlign:'center',fontFamily:'Inter',fontSize:'1.4em',marginRight:'120px'}}>Add</span>
                        <a href="#" className="discunt">Discount</a>
                        <a href="#" className="discunt">Note</a>
                    </div>
                </div>
                <div className="cuntainer" style={{backgroundColor:'white'}}>
                    <div className="litem">Subtotal</div>
                    <div className="litem">{totalPrice}</div>
                    <div className="litem">Tax</div>
                    <div className="litem">Tax price(Right)</div>
                    <div className="litem"><b>Payable Amount</b></div>
                    <div className="litem">Total price (Right)</div>
                </div>
                <div style={{padding:'10px auto',border:'none'}} className="checkOut">
                    <button type="button" style={{padding:'15px',backgroundColor:'#7C00F9',border:'none',fontFamily:'Inter',fontWeight:'bold',borderRadius:'8px',color:'white'}} onClick={handleButtonClick}>Checkout *specifies amount*</button>
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
