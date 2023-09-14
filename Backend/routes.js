// Import the required modules
const express = require('express');
const db = require('./db.js'); // Import the database functions from './db.js'

// Create an instance of the Express Router
const router = express.Router();

// Route to READ ALL items
router.get('/items', async (req, res) => {
    // Call the 'readAllItems' function from the database module
    const { success, data, error } = await db.readAllItems("product");

    if (success) {
        // If the operation is successful, return JSON response with retrieved data
        return res.json(data[0]);
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, messsage: error });
});

// Route to get an item by ID
router.get('/item/:id', async (req, res) => {
    const { id } = req.params; // Extract the 'id' parameter from the URL
    const { success, data, error } = await db.getItemById(id, 'id', 'product'); // Call 'getItemById' with the extracted ID

    if (success) {
        // If the operation is successful, return JSON response with retrieved data
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error });
});

// Route to create an item
router.post('/item', async (req, res) => {
    const { success, data, error } = await db.createOrUpdate(req.body); // Call 'createOrUpdate' with the request body

    if (success) {
        // If the operation is successful, return JSON response with the created item data
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error });
});

// Route to update an item by ID
router.put('/item/:id', async (req, res) => {
    const user = req.body; // Extract the updated item data from the request body
    const { id } = req.params; // Extract the 'id' parameter from the URL
    user.id = parseInt(id); // Convert the 'id' parameter to an integer and add it to the item

    const { success, data, error } = await db.createOrUpdate(user); // Call 'createOrUpdate' with the updated item

    if (success) {
        // If the operation is successful, return JSON response with the updated item data
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error });
});

// Route to delete an item by ID
router.delete('/item/:id', async (req, res) => {
    const { id } = req.params; // Extract the 'id' parameter from the URL
    const { success, data, error } = await db.deleteItemById(id); // Call 'deleteItemById' with the extracted ID

    if (success) {
        // If the operation is successful, return JSON response indicating success
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error });
});

// USER API



router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    const { success, data, error } = await db.getItemById(username, 'username', 'user'); // Call 'getItemById' with the extracted ID

    if (success) {
        // If the operation is successful, return JSON response with retrieved data
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error, data: data, body: req.body });
});

// Export the Express router for use in other parts of the application
module.exports = router;


