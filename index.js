const AWS = require('aws-sdk');
require('dotenv').config();

// Import environment variables.
const { AWS_REGION } = process.env;

// Set region
AWS.config.update({ region: AWS_REGION });

const listSNSTopics = async () => {
	const listTopicsPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).listTopics({}).promise();

	// Handle promise's fulfilled/rejected states
	listTopicsPromise
		.then((data) => {
			console.log(data.Topics);
		})
		.catch((err) => {
			console.error(err, err.stack);
		});
};

const publishSNSTopic = async (message, snsTopic) => {
	// Create publish parameters
	const params = {
		Message: message, // required
		TopicArn: snsTopic,
	};

	// Create promise and SNS service object
	const publishTextPromise = new AWS.SNS({ apiVersion: '2010-03-31' }).publish(params).promise();

	// Handle promise's fulfilled/rejected states
	publishTextPromise
		.then((data) => {
			console.log(`Message ${message} send sent to the topic ${snsTopic}`);
			console.log('MessageID: ', data.MessageId);
		})
		.catch((err) => {
			console.error(err, err.stack);
		});
};
