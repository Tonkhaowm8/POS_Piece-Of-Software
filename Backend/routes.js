const express = require('express');
const db = require('./db.js'); // Import the database functions from './db.js'

// Create an instance of the Express Router
const router = express.Router();

// Function to READ ALL items
const readAllItemsHandler = async (req, res) => {
    try {
        // Call the 'readAllItems' function from the database module
        const { success, data, error } = await db.readAllItems();
        
        if (success) {
            // If the operation is successful, return JSON response with retrieved data
            return res.json({ success, data });
        }
        
        // If there's an error, return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error });
    } catch (error) {
        // Handle any exceptions and return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Function to get an item by ID
const getItemByIdHandler = async (req, res) => {
    try {
        const { id } = req.params; // Extract the 'id' parameter from the URL
        
        // Call 'getItemById' with the extracted ID
        const { success, data, error } = await db.getItemById(id);
        
        if (success) {
            // If the operation is successful, return JSON response with retrieved data
            return res.json({ success, data });
        }
        
        // If there's an error, return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error });
    } catch (error) {
        // Handle any exceptions and return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Function to create an item
const createItemHandler = async (req, res) => {
    try {
        // Call 'createOrUpdate' with the request body
        const { success, data, error } = await db.createOrUpdate(req.body);
        
        if (success) {
            // If the operation is successful, return JSON response with the created item data
            return res.json({ success, data });
        }
        
        // If there's an error, return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error });
    } catch (error) {
        // Handle any exceptions and return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Function to update an item by ID
const updateItemByIdHandler = async (req, res) => {
    try {
        const user = req.body; // Extract the updated item data from the request body
        const { id } = req.params; // Extract the 'id' parameter from the URL
        user.id = parseInt(id); // Convert the 'id' parameter to an integer and add it to the item
        
        // Call 'createOrUpdate' with the updated item
        const { success, data, error } = await db.createOrUpdate(user);
        
        if (success) {
            // If the operation is successful, return JSON response with the updated item data
            return res.json({ success, data });
        }
        
        // If there's an error, return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error });
    } catch (error) {
        // Handle any exceptions and return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Function to delete an item by ID
const deleteItemByIdHandler = async (req, res) => {
    try {
        const { id } = req.params; // Extract the 'id' parameter from the URL
        
        // Call 'deleteItemById' with the extracted ID
        const { success, data, error } = await db.deleteItemById(id);
        
        if (success) {
            // If the operation is successful, return JSON response indicating success
            return res.json({ success, data });
        }
        
        // If there's an error, return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error });
    } catch (error) {
        // Handle any exceptions and return a 500 Internal Server Error with an error message
        return res.status(500).json({ success: false, message: error.message });
    }
};

// Define routes and map them to the respective functions
router.get('/items', readAllItemsHandler);
router.get('/item/:id', getItemByIdHandler);
router.post('/item', createItemHandler);
router.put('/item/:id', updateItemByIdHandler);
router.delete('/item/:id', deleteItemByIdHandler);

// Export the Express router for use in other parts of the application
module.exports = router;