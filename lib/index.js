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

	async AuthAsUser(email, token) {
		if (typeof email !== "string" || typeof token !== "string")
			return new Error("email and token params must be strings");

		this.client.user = true;
		this.client.email = email;
		this.client.token = token;

		return await this.request(`/bridge`, {
				qs: {
					email: this.client.email,
					token: this.client.token
				}
			})
			.then(res => res.json())
			.then(async json => {
				try {
					let error = json.status && json.status.error
					return !error ? Promise.resolve(json) : Promise.reject(json.status.message);
				} catch(e) {
					return Promise.reject(e);
				}
			});
	}
}

module.exports = SocialBlade