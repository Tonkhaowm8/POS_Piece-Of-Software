import React, { useState, useEffect } from "react";
// import RightSidebar from '../ShoppingCart/ShoppingCart.jsx';
import {AiOutlineReload, AiOutlinePlus, AiOutlineShopping, AiFillHome} from "react-icons/ai";
import { IoShirtOutline } from "react-icons/io5";
import { MdEmojiFoodBeverage, MdFastfood, MdFoodBank } from "react-icons/md";
import { TbWashTemperature4 } from "react-icons/tb";
import {TiDelete} from "react-icons/ti";
import ProductModal from "../../ProductModal/ProductModal";
import './Stock.css';
import { useUsername } from '../Login/UsernameContext.jsx'; // Import the useUsername hook
import { Link } from "react-router-dom";

/* Import images for card items */
// import Foods from "../../Images/foods.png";
// import Beverages from "../../Images/beverages.jpg";
// import Fashion from "../../Images/cloths.jpg";
// import Cleaners from "../../Images/cleaners.jpg";
// import Other from "../../Images/others.jpg";


function Stock(props) {
    // Define a state variable to store the data
    const [dataObject, setDataObject] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedData, setSelectedData] = useState(new Map()); // State to store selected data and quantity
    const [totalPrice, setTotalPrice] = useState(0); // State to store the total price
    const [selectedProducts, setSelectedProducts] = useState([]);   // State to store the selected products
    const [showModal, setShowModal] = useState(false);  // State to control modal visibility
    const [isEditMode, setIsEditMode] = useState(false); // State to control edit mode
    const [category, setCategory] = useState("All products"); // State to store the selected category
    const [existingIds, setExistingIds] = useState([]); // Create an array to store existing IDs as an example
    const [searchTerm, setSearchTerm] = useState("");
    const { username } = useUsername();
    
    // Function to check if an ID already exists
    const isIdAlreadyExist = (id) => {
        return existingIds.includes(id);
    };

    const handleShowModal = () => {
        setShowModal(true);
    };
    
    const handleHideModal = () => {
        setShowModal(false);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item === selectedItem ? null : item);
        setCategory(item); // Update the selected category
    };

    const handleSaveModal = (productData) => {
        // Implement the logic to save the product data
        // Here, we'll just add the ID to the existingIds array as an example
        setExistingIds([...existingIds, productData.id]);
        console.log("Saving product data:", productData);
    };

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };
    
    // Images Path
    const categoryImageMap = {
        Foods: require("../../Images/foods.jpg"), // Set the image path for the "Foods" category
        Beverages: require("../../Images/beverages.jpg"), // Set the image path for the "Beverages" category
        Fashion: require("../../Images/cloths.jpg"), // Set the image path for the "Fashion" category
        Cleaners: require("../../Images/cleaners.jpg"), // Set the image path for the "Cleaners" category
        Other: require("../../Images/others.jpg"), // Set the image path for the "Other" category
    };

    useEffect(() => {
        // Fetch the data from the API URL
        fetch('/api/items')
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
        });

        setSelectedProducts((prevProducts) => {
            const existingProduct = prevProducts.find((product) => product.id === item.id);

            if (existingProduct) {
                // If the product already exists in selectedProducts, update its quantity
                const updatedProducts = prevProducts.map((product) => {
                    if (product.id === item.id) {
                        return {
                            ...product,
                            quantity: product.quantity + 1,
                        };
                    }
                    return product;
                });
                return updatedProducts;
            } else {
                // If the product is not in selectedProducts, add it with quantity 1
                return [
                    ...prevProducts,
                    {
                        id: item.id,
                        name: item["ProductName"],
                        quantity: 1,
                        price: item.Price,
                    },
                ];
            }
        });
    };

    // Log the selectedProducts whenever it changes
    useEffect(() => {
        console.log("Selected Products:", selectedProducts);
    }, [selectedProducts]);

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

    useEffect(() => {
        // Add an event listener for the "Escape" key when the component mounts
        const handleKeyDown = (e) => {
          if (e.key === 'Escape') {
            handleHideModal();
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        // Remove the event listener when the component unmounts
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, []); // The empty dependency array ensures the event listener is set up only once

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

    // Filter the dataObject based on the selected category
    const filteredData = dataObject.filter((item) => {
        if (category === "All products" || item.Category === category) {
            if (searchTerm === "") {
                return true; // No search term, show all items in the selected category
            } else {
                // Search term is not empty, check if the item name contains the search term
                return item["ProductName"].toLowerCase().includes(searchTerm.toLowerCase());
            }
        }
        return false; // Item doesn't match category, don't show it
    });

    // Function to clear selected data
    const clearSelectedData = () => {
        setSelectedData(new Map()); // Reset the selectedData state to an empty Map
        setSelectedProducts([]); // Reset the selectedProducts state to an empty array
        setTotalPrice(0); // Reset the total price
    };

    // Function to send the cart data to payment without an HTTP request
    const sendCartData = () => {
    // Construct the URL with query parameters
    const queryParams = new URLSearchParams();
    queryParams.append("username", username);
    for (const product of selectedProducts) {
      queryParams.append("product", product.name);
      queryParams.append("price", product.price);
      queryParams.append("quantity", product.quantity);
      queryParams.append("id", product.id)
    }
    // Append the subtotal to the query parameters
    queryParams.append("totalPrice", totalPrice);

    // Navigate to the Payment component with the query parameters
    window.location.href = `/payment?${queryParams.toString()}`;
  };

    // // Function to send the cart data to the server
    // const sendCartData = async () => {
    //     // Prepare the data to send in the request body
    //     console.log("Username : ",username)
    //     const dataToSend = {
    //         username: username, // Include the username
    //         cartData: selectedProducts, // Send the selectedProducts array
    //     };


    //     try {
    //         // Make an HTTP POST request to your server's '/cart' route
    //         const response = await fetch('http://localhost:4000/api/cart', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify(dataToSend),
    //         });

    //         if (response.ok) {
    //             const responseData = await response.json();
    //             // Handle the response as needed
    //             console.log('Response from server:', responseData);
    //             window.location.href = '/payment'; // Redirect to the payment page
    //         } else {
    //             // Handle HTTP request error
    //             console.error('HTTP request failed:', response.status);
    //         }
    //     } catch (error) {
    //         // Handle network or other errors
    //         console.error('An error occurred:', error);
    //     }
    // };

    // Function to handle save product after adding.?
    const handleSaveProduct = async (productData) => {
        console.log('Product data added:', productData);

        try {
            console.log(JSON.stringify(productData))
          // Make an HTTP POST request to your server's '/item' route
          const response = await fetch('/api/item', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData), // Send the product data in the request body
            
          });
          
          if (response.ok) {
            // Product data was successfully added on the server
            console.log('Product data added:', productData);
      
          } else {
            // Handle the case where the request failed
            console.error('Failed to add product data:', response.status);
          }
        } catch (error) {
          // Handle network or other errors
          console.error('An error occurred while adding product data:', error);
        }
      };

    // Function to handle deletion of data using delete method from route.js
    const handleRemoveItem = async (itemId) => {
        try {
            // Make an HTTP DELETE request to your server's '/item/:id' route
            const response = await fetch(`/api/item/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                // Item was successfully deleted
                console.log(`Item with ID ${itemId} was deleted.`);
                // Refetch data to update the item list
                fetchData();
            } else {
                // Handle the case where the request failed
                console.error(`Failed to delete item with ID ${itemId}:`, response.status);
            }
        } catch (error) {
            // Handle network or other errors
            console.error(`An error occurred while deleting item with ID ${itemId}:`, error);
        }
    };

    const fetchData = () => {
        // Fetch the data from the API URL
        fetch('/api/items')
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
    };
      

    return (
        <div className="stock-Background">
                <div className="scrollable-content" /* id="bacc" */ >
                <div className="button-container d-flex align-items-center justify-content-between">
                    <div className="input-group">
                        <input
                        type="text"
                        placeholder="Search by name..."
                        className="form-control ml-3"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <div className="input-group-append">
                        <button type="button" className="btn btn-primary buttonn" onClick={handleShowModal}>
                            Add Product
                        </button>
                        <button type="button" className="btn btn-secondary buttonn" onClick={toggleEditMode}>
                            {isEditMode ? "Done Editing" : "Edit Product"}
                        </button>
                        </div>
                    </div>
                </div>
                <div className="selection">
                    <span
                        className={selectedItem === "All products" ? "selected" : "unselected"}
                        onClick={() => handleItemClick("All products")}
                        id="href3"
                    >
                        All Products
                        <AiFillHome className="iconsiam"/>
                    </span>
                    <span
                        className={selectedItem === "Foods" ? "selected" : "unselected"}
                        onClick={() => handleItemClick("Foods")}
                        id="href3"
                    >
                        Foods
                        <MdFoodBank className="iconsiam"/>
                    </span>
                    <span
                        className={selectedItem === "Beverages" ? "selected" : "unselected"}
                        onClick={() => handleItemClick("Beverages")}
                        id="href3"
                    >
                        Beverages
                        <MdEmojiFoodBeverage className="iconsiam"/>
                    </span>
                    <span
                        className={selectedItem === "Fashion" ? "selected" : "unselected"}
                        onClick={() => handleItemClick("Fashion")}
                        id="href3"
                    >
                        Fashion
                        <IoShirtOutline className="iconsiam"/>
                    </span>
                    <span
                        className={selectedItem === "Cleaners" ? "selected" : "unselected"}
                        onClick={() => handleItemClick("Cleaners")}
                        id="href3"
                    >
                        Cleaners
                        <TbWashTemperature4 className="iconsiam"/>
                    </span>
                    <span
                        className={selectedItem === "Other" ? "selected" : "unselected"}
                        onClick={() => handleItemClick("Other")}
                        id="href3"
                    >
                        Other
                        <AiOutlineShopping className="iconsiam"/>
                    </span>
                </div>

                <div className="card-container" >
                    <div className="flex">
                        {/* Map over dataObject and create card elements */}
                        {filteredData.map((item, index) => (
                            <div className="flex-item" key={index} style={{ flex: "0 0 33%" }}>
                                <div className={`card ${isEditMode ? "edit-mode" : ""}`} onClick={() => handleCardClick(item)}>
                                    {isEditMode && (
                                        <button
                                            className="remove-button"
                                            style={{border:'none',borderRadius:'8px 0px 0px 0px',backgroundColor:'white',color:'red',width:'0px',fontSize:'18px'}}
                                            onClick={(e) => {
                                                e.stopPropagation(); // Prevent card click event
                                                handleRemoveItem(item.id);
                                            }}
                                        >
                                            <TiDelete />
                                        </button>
                                    )}
                                    <img id="carde" src={categoryImageMap[item.Category]} alt={item.Category} style={{margin:'0 auto',width:'80%',height:'auto'}}/>
                                    <span style={{ fontFamily: 'Lato', fontWeight: '700', color: 'rgba(35, 29, 218, 0.85)' }}>{item["ProductName"]}</span>
                                    <span id="carde">Stock: {item.Stock}</span>
                                    <span id="carde">{item.Price} ฿</span>
                                    <span id="carde">{item.Category}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Conditionally render the modal */}

            {/* Get the functions in the productmodal */}
            <ProductModal show={showModal} onClose={handleHideModal} onSave={handleSaveProduct} isIdAlreadyExist={isIdAlreadyExist}/>

            <div className="scrollable-content">
                <div style={{padding:'0 15px'}}>

                </div>
            </div>
            
            {/* padding left-right can only 70px */}
            <div className="scrollable-content" style={{maxWidth:'400px'}}>   
                <div className="checktitle">
                    <span style={{marginLeft:'2em'}}></span>
                    <span style={{fontFamily:'Raleway',fontWeight:'bold',fontSize:'1.85em',padding:'8px'}}>Checkout</span>
                    <button onClick={clearSelectedData} style={{flexShrink:0,marginLeft:'10px',border:'none',backgroundColor:'rgb(230, 225, 225)'}}><AiOutlineReload/></button>
                </div>

                <div className="checktitle" style={{backgroundColor:'rgb(210, 210, 210)',flexWrap:'wrap',justifyContent:'space-between',marginTop:'18px'}}>
                    <div className="fitem" style={{marginLeft:'10px'}}>Quantity</div>
                    <div className="fitem" style={{marginLeft:'20px'}}>Name</div>
                    <div className="fitem" style={{marginRight:'60px'}}>Price</div>
                </div>

                <div style={{backgroundColor:'#f2eded'}} className="stackblock">

                    {/* Display items from clicked card: with quantity count method */}
                    {Array.from(selectedData.keys()).map((itemId, index) => {
                    const quantity = selectedData.get(itemId);

                        return (
                            quantity > 0 && (
                                <div key={index}>
                                    {/* Find the item in dataObject using its ID  border-style: ridge;*/}
                                    {dataObject.map((item) => {
                                        if (item.id === itemId) {
                                            return (
                                                <div key={item.id} className="stackflake">
                                                    <div className="quantity-align">
                                                        <button onClick={() => increaseQuantity(item.id)} style={{border:'none',backgroundColor:'#f2eded',borderRadius:'5%'}}><AiOutlinePlus/></button>
                                                        <span>{quantity}</span>
                                                        <span>{item["ProductName"]}</span>
                                                    </div>
                                                    
                                                    <div className="quantity-align">
                                                        {/* <span>{item["ProductName"]}</span> */}
                                                        <span>{item.Price}฿</span>
                                                        <button onClick={() => decreaseQuantity(item.id)} style={{border:'none',backgroundColor:'#f2eded',color:'red'}}><TiDelete/></button>
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
                    <div className="litem">{totalPrice}฿</div>
                    <div className="litem"><b>Payable Amount</b></div>
                    <div className="litem">{totalPrice}฿</div>
                </div>
                <div style={{padding:'10px auto',border:'none',backgroundColor:'white'}} className="checkOut">
                    <Link to="/payment">
                        <button
                        type="button"
                        style={{
                            padding: "15px",
                            backgroundColor: "#7C00F9",
                            border: "none",
                            fontFamily: "Inter",
                            fontWeight: "bold",
                            borderRadius: "12px",
                            color: "white",
                        }}
                        onClick={sendCartData}
                        >
                        Checkout
                        </button>
                    </Link>
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
