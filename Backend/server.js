const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const AWS = require('aws-sdk');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 4000;

// Configure AWS SDK with access credentials and region
let cred = 'hi';

try {
  // Read and parse the contents of the 'credentials.json' file
  const jsonString = fs.readFileSync('./credentials.json');
  cred = JSON.parse(jsonString);
} catch (err) {
  console.log(err); // Log any errors that occur during file reading or parsing
  return; // Exit the program if an error occurs
}

AWS.config.update({
  accessKeyId: cred.ACCESS_KEY_ID, // Set the AWS access key ID from parsed JSON
  secretAccessKey: cred.SECRET_ACCESS_KEY, // Set the AWS secret access key from parsed JSON
  region: 'us-east-1', // Set the AWS region to 'us-east-1'
});

// Create a new instance of AWS DynamoDB DocumentClient
const db = new AWS.DynamoDB.DocumentClient();

// Export the configured AWS DynamoDB DocumentClient and the table name
const dynamoConfig = {
  db, // Export the DynamoDB DocumentClient for use in other parts of the application
  aws_table_name: 'product', // Export the AWS DynamoDB table name as 'product'
};
module.exports = dynamoConfig;

// Import required modules
const items = require('./routes.js');

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.use('/api', items);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
