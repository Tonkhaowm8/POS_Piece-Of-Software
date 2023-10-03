import React, { useState, useEffect } from "react";
import Draggable from "react-draggable"; // Import the Draggable component
import "./ProductModal.css"; // Create a CSS file for any custom styling

const ProductModal = ({ show, onClose }) => {
  const [productName, setProductName] = useState("");
  const [stockValue, setStockValue] = useState(0);
  const [priceValue, setPriceValue] = useState(0);
  const [idNumber, setIdNumber] = useState(0);
  const [category, setCategory] = useState("Foods");

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

  const handleSave = () => {
    // You can handle the save action here, e.g., send data to the server
    console.log({
      productName,
      stockValue,
      priceValue,
      idNumber,
      category,
    });
    onClose();
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
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  placeholder="Enter product name"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="stockValue">Stock Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="stockValue"
                  placeholder="Enter stock value"
                  value={stockValue}
                  onChange={(e) => setStockValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="priceValue">Price Value</label>
                <input
                  type="number"
                  className="form-control"
                  id="priceValue"
                  placeholder="Enter price value"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="idNumber">ID Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="idNumber"
                  placeholder="Enter ID number"
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  className="form-control"
                  id="category"
                  value={category}
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
