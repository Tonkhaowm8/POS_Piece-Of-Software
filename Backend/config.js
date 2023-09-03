const credit = require('credentials.json')

console.log("hello")
console.log(credit(ACCESS_KEY_ID))
module.exports = {
    aws_table_name: 'dynamodb-test',
    aws_local_config: {
      //Provide details for local configuration
    },
    aws_remote_config: {
      accessKeyId: credit(ACCESS_KEY_ID),
      secretAccessKey: 'SECRET_ACCESS_KEY',
      region: 'us-east-1',
    }
};