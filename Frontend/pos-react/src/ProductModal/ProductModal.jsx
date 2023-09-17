import React, { useState } from "react";
import Draggable from "react-draggable"; // Import Draggable from the react-draggable library
import './ProductModal.css';

function ProductModal({ isOpen, onClose }) {
  const [productName, setProductName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [id, setId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Product Name:", productName);
    console.log("Stock:", stock);
    console.log("Price:", price);
    onClose();
  };

  return (
    isOpen && (
      <Draggable bounds={{ top: 0, left: 0, right: 200, bottom: 150 }}>
         <div className="modal-wrapper">
            <div className="modal">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
                <label>
                Product Name:
                <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                />
                </label>
                <label>
                Stock:
                <input
                    type="text"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                />
                </label>
                <label>
                Price:
                <input
                    type="text"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
                </label>
                <label>
                Id:
                <input
                    type="number"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                />
                </label>
                <button type="submit">Save</button>
            </form>
            <button className="close-button" onClick={onClose}>
                Close
            </button>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
      </Draggable>
    )
  );
}

export default ProductModal;
