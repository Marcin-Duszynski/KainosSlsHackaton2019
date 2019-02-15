const AWS = require('aws-sdk');
const util = require('util');

const documentClient = new AWS.DynamoDB.DocumentClient();
documentClient.queryAsync = util.promisify(documentClient.query);

exports.handler = async (event, context, callback) => {
  try {
    var params = {
      ExpressionAttributeValues: {
        ':bookId': event.userName
       },
     KeyConditionExpression: 'bookId = :bookId',
     TableName: process.env.STORE_DB_NAME,
    };

    const queryResult = await documentClient.queryAsync(params);

    callback(null, {
      books: queryResult.Items,
      count: queryResult.Count
    });
  } catch (error) {
    console.error(error);

    callback(new Error('[500] getUserBorrowed function error'));
  }
}