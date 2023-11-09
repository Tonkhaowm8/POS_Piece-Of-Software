// Import the required modules
const express = require('express');
const db = require('./db.js'); // Import the database functions from './db.js'

// Create an instance of the Express Router
const router = express.Router();

// Add middleware to parse JSON data
router.use(express.json());

//-------------------------------------------------------------------------------------------------------------------------------

// Route to READ ALL items
router.get('/items', async (req, res) => {
    // Call the 'readAllItems' function from the database module
    const { success, data, error } = await db.readAllItems("product");

    if (success) {
        // If the operation is successful, return JSON response with retrieved data
        return res.json(data);
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, messsage: error });
});

//-------------------------------------------------------------------------------------------------------------------------------

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

//-------------------------------------------------------------------------------------------------------------------------------

// Route to create an item
router.post('/item', async (req, res) => {
    const { success, data, error } = await db.createOrUpdate(req.body, 'product'); // Call 'createOrUpdate' with the request body

    if (success) {
        // If the operation is successful, return JSON response with the created item data
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error, data: req.body });
});

//-------------------------------------------------------------------------------------------------------------------------------

// Route to update an item by ID
router.put('/item/:id', async (req, res) => {
    const user = req.body; // Extract the updated item data from the request body
    const { id } = req.params; // Extract the 'id' parameter from the URL
    user.id = parseInt(id); // Convert the 'id' parameter to an integer and add it to the item

    const { success, data, error } = await db.createOrUpdate(user, 'product'); // Call 'createOrUpdate' with the updated item

    if (success) {
        // If the operation is successful, return JSON response with the updated item data
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error });
});

//-------------------------------------------------------------------------------------------------------------------------------

// Route to delete an item by ID
router.delete('/item/:id', async (req, res) => {
    const { id } = req.params; // Extract the 'id' parameter from the URL
    const { success, data, error } = await db.deleteItemById(id); // Call 'deleteItemById' with the extracted ID

    if (success) {
        // If the operation is successful, return JSON response indicating success
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error, key: id });
});

// USER API

//-------------------------------------------------------------------------------------------------------------------------------

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    const { success, data, error } = await db.getItemById(username, 'username', 'user'); // Call 'getItemById' with the extracted ID

    if (success) {
        // If the operation is successful, return JSON response with retrieved data
        if (password == data.password) {
            cookie = username;
            return res.json({login: true, user: data})
        } else {
            return res.json({login: false, reason: "wrong password"})
        }
        return res.json({ success, data });
    }

    // If there's an error, return a 500 Internal Server Error with an error message
    return res.status(500).json({ success: false, message: error, data: data, body: req.body });
});

//-------------------------------------------------------------------------------------------------------------------------------

router.post('/cart', (req, res) => {
    const { username, products, totalPrice } = req.body; // Destructure username and cartData from the request body

    console.log('Received cart data from', username, ':', products, 'Total Price: ', totalPrice);

    return res.json({ success: true, received_cart: products }); // Respond with the received cart data
});

//-------------------------------------------------------------------------------------------------------------------------------

// Route to take order

router.post('/receipt', async (req, res) => {

    // change the req data so that it fits the db format
    const receiptData = req.body;
    receiptData.user = receiptData.username;
    delete receiptData.username;
    //console.log(receiptData);
    const { success: success0, data: data0, error: error0 } = await db.readAllItems("orders");
    //console.log(data0.length);
    receiptData.id = data0.length + 1;
    const { success: success, data: data, error: error } = await db.createOrUpdate(receiptData, 'orders');
    //console.log(data)

    if (success) {
        for (let i of data['products']) {
            const {success: success1, data: data1, error: error1} = await db.getItemById(i['id'], 'id', 'product');
            //console.log(data1)
            if (success1){
                //console.log(data1['Stock']); // get itemid of each item in receipt
                data1['Stock'] = parseInt(data1['Stock']) - parseInt(i['quantity']);
                const newData = data1;    
                let {success: success2, data: data2, error: error2} = await db.createOrUpdate(newData, 'product');

                if (success2) {
                    return res.json({success: success2, data: data2})
                } else {
                    return res.json({success: success2, reason: error2})
                }

            } else {
                return res.json({success: success1, reason: error1})
            }
        }

    } else {
        return res.json({success: success, reason: error})
    }
})

// API for dashboard
router.get('/dashboard', async (req, res) => {
    var totalSold = 0;
    var amountSold = 0;
    var totalPeople = 0;
    var highestSale = 0;
    // var itemsWithUsers = [];

    // calculate total sold and amount sold
    const {success, data, error} = await db.readAllItems("orders");
    const {success: succPpl, data: dataPpl, error: errorPpl} = await db.readAllItems("user")
    console.log(data)
    console.log(dataPpl)

    if (success && succPpl) {
        for (let i of data[0]['item']) {
            for (let j of dataPpl) {
                // Assuming there is a common identifier to match items and users, replace "commonIdentifier" with the actual field that connects items with users
                if (i['user'] === j['username (String)']) {
                    amountSold += i['quantity'];
                    let currentsold = (i['quantity'] * i['price']);
                    totalSold += currentsold;
                    if (currentsold > highestSale) {
                        highestSale = currentsold;
                    }

                    itemsWithUsers.push(j);
                }
            }
        }

        // Extract the "name" from each user in "Ppl"
        const namesFromPpl = data.map(orders => orders.user);

        return res.json({ totalSold: totalSold, amountSold: amountSold, totalPeople: dataPpl.length, highestSale: highestSale, Ppl: namesFromPpl });
    } else {
        return res.status(500).json({ success: false, message: error });
    }

})

// Export the Express router for use in other parts of the application
module.exports = router;
