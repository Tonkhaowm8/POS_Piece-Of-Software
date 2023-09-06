const config = require("./credentials.json")
const AWS = require("aws-sdk")
const fs = require('fs')
let cred = "hi"


try {
  const jsonString = fs.readFileSync("./credentials.json");
  cred = JSON.parse(jsonString);
} catch (err) {
  console.log(err);
  return;
}

AWS.config.update({
  accessKeyId: (cred.ACCESS_KEY_ID),
  secretAccessKey: (cred.SECRET_ACCESS_KEY),
  region: 'us-east-1',
})

const db = new AWS.DynamoDB.DocumentClient()

module.exports = {
    db,
    aws_table_name: 'product',
};