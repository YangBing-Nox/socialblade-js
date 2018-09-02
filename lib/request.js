const axios = require('axios');

module.exports = axios.create({
	baseURL: 'https://api.socialblade.com/v2/',
	timeout: 1500,
	headers: {
		"User-Agent": "Tim's JavaScript Library :: TimothyCole/socialblade-js"
	}
});