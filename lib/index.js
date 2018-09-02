'use strict';

class SocialBlade {
	constructor() {
		// Defaults
		this.client = {
			user: false,
			email: "",
			token: "",
			key: ""
		};

		this.request = require('./request');
	}

	AuthAsUser(email, token) {
		if (typeof email !== "string" || typeof email !== "string")
			return new Error("email and token params must be strings");

		this.client.user = true;
		this.client.email = email;
		this.client.token = token;

		var bridge = this.request.get(`/bridge`, {
			params: {
				email: this.client.email,
				token: this.client.token
			}
		})

		return bridge
			.then(res =>  res)
			.catch(error => { throw error; })
	}
}