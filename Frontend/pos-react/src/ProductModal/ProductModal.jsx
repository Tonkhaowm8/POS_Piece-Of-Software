import React, { useState, useEffect } from "react";
import Draggable from "react-draggable"; // Import the Draggable component
import "./ProductModal.css"; // Create a CSS file for any custom styling

const ProductModal = ({ show, onClose, onSave, isIdAlreadyExist }) => {
  const [ProductName, setProductName] = useState("");
  const [Stock, setStockValue] = useState(0);
  const [Price, setPriceValue] = useState(0);
  const [id, setIdNumber] = useState(0);
  const [Category, setCategory] = useState("Foods");
  const [isIdExist, setIsIdExist] = useState(false); // State to track if the ID already exists

  // Add an event listener to the document to handle clicks outside the modal
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (show && e.target.classList.contains("modal")) {
        onClose();
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [show, onClose]);

  // Collects input product data

  const handleStockChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setStockValue(newValue);
    }
  };

  const handlePriceChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setPriceValue(newValue);
    }
  };

  const handleIdChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      setIdNumber(newValue);
    }
  };

  const checkIdExistence = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/api/item/${id}`);
      const data = await response.json();

      if (data.success) {
        setIsIdExist(true);
      } else {
        setIsIdExist(false);
      }
    } catch (error) {
      console.error("Error checking ID existence:", error);
    }
  };

  useEffect(() => {
    if (id !== 0) {
      checkIdExistence(id);
    }
  }, [id]);

  const handleSave = () => {
    if (isIdAlreadyExist(id)) {
      alert("ID already exists in the database.");
    } else {
      const productData = {
        ProductName,
        Stock,
        Price,
        id,
        Category,
      };

      onSave(productData);
      onClose();
    }
  };
  
  return (
    <Draggable handle=".modal-header" bounds={{left: 0, top: 0, right: 270, bottom: 30}}>
        <div className={`modal ${show ? "show" : ""}`}>
      <div className="modal-centered  modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">Add Product Informations</h4>
            <button type="button" className="close btn btn-light" onClick={onClose}>
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="form-group">
                <label htmlFor="ProductName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="ProductName"
                  placeholder="Enter product name"
                  value={ProductName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="StockValue">Stock Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="Stock"
                  placeholder="Enter stock value"
                  value={Stock}
                  onChange={handleStockChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Price">Price Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="Price"
                  placeholder="Enter price value"
                  value={Price}
                  onChange={handlePriceChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="id">ID Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="id"
                  placeholder="Enter ID number"
                  value={id}
                  onChange={handleIdChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Category">Category</label>
                <select
                  className="form-control"
                  id="Category"
                  value={Category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="Foods">Foods</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Cleaners">Cleaners</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              style={{backgroundColor:'#7C00F9'}}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
    </Draggable>
  );
};

export default ProductModal;
