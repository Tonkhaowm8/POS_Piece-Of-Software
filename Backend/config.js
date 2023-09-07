// Import required modules
const config = require("./credentials.json"); // Import the credentials from a JSON file
const AWS = require("aws-sdk"); // Import the AWS SDK
const fs = require('fs'); // Import the file system module
let cred = "hi"; // Initialize a variable 'cred' with a default value of "hi"

try {
  // Read and parse the contents of the 'credentials.json' file
  const jsonString = fs.readFileSync("./credentials.json");
  cred = JSON.parse(jsonString);
} catch (err) {
  console.log(err); // Log any errors that occur during file reading or parsing
  return; // Exit the program if an error occurs
}

// Configure AWS SDK with access credentials and region
AWS.config.update({
  accessKeyId: (cred.ACCESS_KEY_ID), // Set the AWS access key ID from parsed JSON
  secretAccessKey: (cred.SECRET_ACCESS_KEY), // Set the AWS secret access key from parsed JSON
  region: 'us-east-1', // Set the AWS region to 'us-east-1'
})

// Create a new instance of AWS DynamoDB DocumentClient
const db = new AWS.DynamoDB.DocumentClient();

// Export the configured AWS DynamoDB DocumentClient and the table name
module.exports = {
    db, // Export the DynamoDB DocumentClient for use in other parts of the application
    aws_table_name: 'product', // Export the AWS DynamoDB table name as 'product'
};