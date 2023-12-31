// Import the configuration module from './config.js'
const { response } = require('express');
const config = require('./server.js');

// Function for creating or updating items in a database table
const createOrUpdate = async (data = {}, table) => {

    // Define the parameters for the operation
    const params = {
        TableName: table, // Specify the name of the AWS DynamoDB table from the config
        Item: data, // The data to be inserted or updated
    };

    try {
        // Perform a put operation (insert or update) on the DynamoDB table
        await config.db.put(params).promise();
        return { success: true, data: data }; // Return success status
    } catch (error) {
        return { success: false, error: error.message, data: data }; // Return error if operation fails
    }
}

// Function for reading all items from a database table
const readAllItems = async (table) => {

    // Define the parameters for the scan operation
    const params = {
        TableName: table, // Specify the name of the AWS DynamoDB table from the config
    }

    try {
        // Perform a scan operation to retrieve all items from the DynamoDB table
        const { Items = [] } = await config.db.scan(params).promise();
        return { success: true, data: Items }; // Return success status and retrieved data
    }
     catch (error) {
        return { success: false, data: null, error: error.message }; // Return error if operation fails
    } 
}

// Function for reading an item from a database table by its ID
const getItemById = async (value, key, table) => {
    let params = ''
    let noVal = ''
    if (isNaN(parseInt(value))) {
        noVal = value;
    } else {
        noVal = parseInt(value);
    }
    // Define the parameters for the get operation using the specified key
    params = {
        TableName: table, // Specify the name of the AWS DynamoDB table from the config
        Key: {
            [key]: noVal, // Use the provided value as the key to retrieve the item
        }
    }

    try {
        // Perform a get operation to retrieve the item from the DynamoDB table
        const { Item = {} } = await config.db.get(params).promise();
        return { success: true, data: Item }; // Return success status and retrieved data
    } catch (error) {
        return { success: false, data: noVal, error: error.message }; // Return error if operation fails
    }
}

// Function for deleting an item from a database table by its ID
const deleteItemById = async (value, key = 'id') => {
    
    // Define the parameters for the delete operation using the specified key
    const params = {
        TableName: config.aws_table_name, // Specify the name of the AWS DynamoDB table from the config
        Key: {
            [key]: parseInt(value), // Use the provided value as the key to identify the item to delete
        }
    }

    try {
        // Perform a delete operation to remove the item from the DynamoDB table
        await config.db.delete(params).promise();
        return { success: true }; // Return success status
    } catch (error) {
        return { success: false, error: error.message }; // Return error if operation fails
    }
}

const users = [];

// Function to find a user by username
function findUserByUsername(username) {
  return users.find(user => user.username === username);
}

// Export the necessary functions or data
module.exports = {
  users,
  findUserByUsername,
};


// Export the defined functions for use in other parts of the application
module.exports = {
    createOrUpdate,
    readAllItems,
    getItemById,
    deleteItemById,
    users,
    findUserByUsername,
} 