const config = require("./credentials.json")
const fs = require('fs')
let cred = "hi"

try{
  const jsonString = fs.readFileSync("./credentials.json");
  cred = JSON.parse(jsonString);
} catch (err) {
  console.log(err);
  return;
}

module.exports = {
    aws_table_name: 'dynamodb-test',
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: {
      accessKeyId: (cred.ACCESS_KEY_ID),
      secretAccessKey: (cred.SECRET_ACCESS_KEY),
      region: 'us-east-1',
    }
};