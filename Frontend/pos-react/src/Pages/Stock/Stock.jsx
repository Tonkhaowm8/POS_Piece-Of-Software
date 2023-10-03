import React, { useState, useEffect } from "react";
// import RightSidebar from '../ShoppingCart/ShoppingCart.jsx';
import {AiOutlineReload, AiOutlinePlus} from "react-icons/ai";
import {TiDeleteOutline} from "react-icons/ti";
import ProductModal from "../../ProductModal/ProductModal";
import './Stock.css';
import { useUsername } from '../Login/UsernameContext.jsx'; // Import the useUsername hook
import { Link } from 'react-router-dom'; // Import Link from react-router-dom


function Stock(props) {
    // Define a state variable to store the data
    const [dataObject, setDataObject] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedData, setSelectedData] = useState(new Map()); // State to store selected data and quantity
    const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
    const [taxRate, setTaxRate] = useState(0.1); // Tax rate as 10% (adjust as needed)
    const [taxAmount, setTaxAmount] = useState(0); // State to store the calculated tax amount
    const [username, setUsername] = useState(""); // State to store the username 
    const [selectedProducts, setSelectedProducts] = useState([]);   // State to store the selected products
    const [showModal, setShowModal] = useState(false);  // State to control modal visibility

    // const { username } = useUsername();

    const handleShowModal = () => {
        setShowModal(true);
      };
    
      const handleHideModal = () => {
        setShowModal(false);
      };

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
    
        // Add the selected product to the selectedProducts array
        setSelectedProducts((prevProducts) => {
            const updatedProducts = [...prevProducts];
            updatedProducts.push({
                id: item.id,
                name: item["Product Name"],
                quantity: prevProducts.find((product) => product.id === item.id)?.quantity + 1 || 1,
                price: item.Price,
            });
            return updatedProducts;
        });
    };
    
    // Log the selectedProducts whenever it changes
    useEffect(() => {
    console.log("Selected Products:", selectedProducts);
    }, [selectedProducts]);

    // Function to increase the quantity of a selected item
    const increaseQuantity = (itemId) => {
        setSelectedData((prevMap) => {
            const updatedMap = new Map(prevMap);
            const prevQuantity = updatedMap.get(itemId) || 0;
            if (prevQuantity > 0) {
                updatedMap.set(itemId, prevQuantity + 1);
            }
            return updatedMap;
        });
    };

    // Function to decrease the quantity of a selected item
    
    const decreaseQuantity = (itemId) => {
        setSelectedData((prevMap) => {
            const updatedMap = new Map(prevMap);
            const prevQuantity = updatedMap.get(itemId) || 0;
            if (prevQuantity > 0) {
                updatedMap.set(itemId, prevQuantity - 1);

                // Remove the item from selectedProducts if its quantity becomes 0
                setSelectedProducts((prevProducts) => {
                    const updatedProducts = prevProducts.filter((product) => product.id !== itemId);
                    return updatedProducts;
                });
            }
            return updatedMap;
        });
    };

    // Function to clear selected data
const clearSelectedData = () => {
    setSelectedData(new Map()); // Reset the selectedData state to an empty Map
    setSelectedProducts([]); // Reset the selectedProducts state to an empty array
    setTotalPrice(0); // Reset the total price
    setTaxAmount(0); // Reset the tax amount
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

    // Calculate the tax amount based on the total price and tax rate
    useEffect(() => {
        const calculatedTaxAmount = totalPrice * taxRate;
        setTaxAmount(calculatedTaxAmount);
    }, [totalPrice, taxRate]);

    // Calculate the total price including tax
    const totalIncludingTax = totalPrice + taxAmount;

    // Function to send the cart data to the server
    const sendCartData = async () => {
        // Prepare the data to send in the request body
        console.log("Username : ",username)
        const dataToSend = {
            username: username, // Include the username
            cartData: selectedProducts, // Send the selectedProducts array
        };
    
    
        try {
            // Make an HTTP POST request to your server's '/cart' route
            const response = await fetch('http://localhost:4000/api/cart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });
    
            if (response.ok) {
                const responseData = await response.json();
                // Handle the response as needed
                console.log('Response from server:', responseData);
                window.location.href = '/payment'; // Redirect to the payment page
            } else {
                // Handle HTTP request error
                console.error('HTTP request failed:', response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error('An error occurred:', error);
        }
    };
    

    return (
        <div className="stock-Background">
            <div className="scrollable-content" /* id="bacc" */ style={{backgroundColor:'rgb(230, 225, 225)',boxShadow:'0px 5px 8px 0px rgba(0, 0, 0, 0.5)'}}>
                <div className="selection">
                    <span
                        className={selectedItem === "All products" ? "selected" : ""}
                        onClick={() => handleItemClick("All products")}
                        id="href3"
                    >
                        All products
                    </span>
                    <span
                        className={selectedItem === "Foods" ? "selected" : ""}
                        onClick={() => handleItemClick("Foods")}
                        id="href3"
                    >
                        Foods
                    </span>
                    <span
                        className={selectedItem === "Beverages" ? "selected" : ""}
                        onClick={() => handleItemClick("Beverages")}
                        id="href3"
                    >
                        Beverages
                    </span>
                    <span
                        className={selectedItem === "Fashion" ? "selected" : ""}
                        onClick={() => handleItemClick("Fashion")}
                        id="href3"
                    >
                        Fashion
                    </span>
                    <span
                        className={selectedItem === "Cleaners" ? "selected" : ""}
                        onClick={() => handleItemClick("Cleaners")}
                        id="href3"
                    >
                        Cleaners
                    </span>
                    <span
                        className={selectedItem === "Other" ? "selected" : ""}
                        onClick={() => handleItemClick("Other")}
                        id="href3"
                    >
                        Other
                    </span>
                </div>
                <div className="button-container">
                    <button type="button" className="buttonn"   onClick={handleShowModal}>Add Product</button>
                    <button type="button" className="buttonn"  onClick={handleButtonClick}>Edit Product</button>
                </div>
                <div className="card-container" >
                    <div className="flex">
                        {/* Map over dataObject and create card elements */}
                        {dataObject.map((item, index) => (
                            <div className="flex-item" key={index}>
                                <div className="card" onClick={() => handleCardClick(item)}>
                                    {/* <span style={{fontFamily:'Lato',fontWeight:'900'}}>Item pic {index + 1}</span> */}
                                    <span style={{fontFamily:'Lato',fontWeight:'900'}}>ID: {item.id}</span>
                                    <span style={{fontFamily:'Lato',fontWeight:'400'}}>"{item["Product Name"]}"</span>
                                    <span id="carde">Stock: {item.Stock}</span>
                                    <span id="carde">Price: {item.Price}</span>
                                    <span id="carde">{item.Category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Conditionally render the modal */}
            <ProductModal show={showModal} onClose={handleHideModal}/>
            <div className="scrollable-content">
                <div style={{padding:'0 8px'}}>

                </div>
            </div>
            
            {/* padding left-right can only 70px */}
            <div className="scrollable-content" style={{boxShadow:'0px 5px 8px 0px rgba(0, 0, 0, 0.5)',backgroundColor:'rgb(230, 225, 225)',maxWidth:'450px',width:'450px'}}>   
                <div className="checktitle">
                    <span style={{marginLeft:'2em'}}></span>
                    <span style={{fontFamily:'Raleway',fontWeight:'bold',fontSize:'1.875em'}}>Checkout</span>
                    <button onClick={clearSelectedData} style={{flexShrink:0,marginLeft:'10px',border:'none',backgroundColor:'rgb(230, 225, 225)'}}><AiOutlineReload/></button>
                </div>
                <div style={{backgroundColor:'#f2eded'}} className="stackblock">

                    {/* Display items from clicked card: with quantity count method */}
                    {Array.from(selectedData.keys()).map((itemId, index) => {
                    const quantity = selectedData.get(itemId);

                        return (
                            quantity > 0 && (
                                <div key={index}>
                                    {/* Find the item in dataObject using its ID */}
                                    {dataObject.map((item) => {
                                        if (item.id === itemId) {
                                            return (
                                                <div key={item.id} className="stackflake">
                                                    <div className="quantity-align">
                                                        <button onClick={() => increaseQuantity(item.id)} style={{border:'none',backgroundColor:'rgb(230, 225, 225)'}}><AiOutlinePlus/></button>
                                                        <span>{quantity}</span>
                                                    </div>
                                                    <span>{item["Product Name"]}</span>
                                                    <div className="quantity-align">
                                                        <span style={{justifyContent:'flex-start'}}>Price: {item.Price}</span>
                                                        <button onClick={() => decreaseQuantity(item.id)} style={{border:'none',backgroundColor:'rgb(230, 225, 225)'}}><TiDeleteOutline/></button>
                                                    </div>
                                                </div>
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            )
                        );
                    })}
                </div>
                <div className="cuntainer" style={{backgroundColor:'white'}}>
                    <div className="litem">Subtotal</div>
                    <div className="litem">{totalPrice}</div>
                    <div className="litem">Tax</div>
                    <div className="litem">{(taxRate * 100).toFixed(2)}%</div>
                    <div className="litem"><b>Payable Amount</b></div>
                    <div className="litem">{totalIncludingTax}</div>
                </div>
                <div style={{padding:'10px auto',border:'none'}} className="checkOut">
                    <button type="button" style={{padding:'15px',backgroundColor:'#7C00F9',border:'none',fontFamily:'Inter',fontWeight:'bold',borderRadius:'8px',color:'white'}} onClick={sendCartData}>Checkout *specifies amount*</button>
                </div>
            </div>
            
        </div>
    );
}

function handleButtonClick() {
    // Perform actions when the button is clicked
    alert('Button Clicked! :)');
    // You can add more logic or state updates here
}


export default Stock;
