import { RequestAPI, RequestResponse, RequiredUriUrl } from 'request';
import * as request from 'request-promise-native';

import { IClient } from './interfaces/client.interface';
import { IUser } from './interfaces/user.interface';
import { IDeveloper } from './interfaces/dev.interface';

import { Endpoints } from './utils/endpoints';

export class SocialBladeClient {
	private Http: RequestAPI<request.RequestPromise, request.RequestPromiseOptions, RequiredUriUrl>;
	private Client: IClient;

	private readonly Version: string = "v2";
	private readonly BaseURL: string = `https://api.socialblade.com/${this.Version}`;
	private readonly UserAgent: string = "Tim's JavaScript Library :: TimothyCole/socialblade-js";

	constructor () {
		this.Client = <IClient> {};
		this.Http = request.defaults({
			baseUrl: this.BaseURL,
			method: "GET",
			timeout: 1000,
			rejectUnauthorized: false,
			simple: false,
			json: true,
			resolveWithFullResponse: true,
			headers: {
				"Content-Type": "application/json",
				"Cache-Control": "no-cache",
				"User-Agent": this.UserAgent
			}
	  });
	}

	public isAuthed (): boolean { return this.Client.user !== undefined || this.Client.key !== undefined }

	public async AuthAsUser (email: IClient['email'], token: IClient['token']): Promise<IUser> {
		const response = <RequestResponse> await this.Http.get({
			uri: Endpoints.UserAuth,
			qs: { email, token }
		})
		const body = <IUser> response.body;

		// If there is an error we can just return the body
		if (body.status.error) return body;

		// If there isn't an error then we can set the client as active then return the body
		this.Client = <IClient> {
			user: true,
			email, token
		};

		return body;
	}

	public async Auth (key: IClient['key']): Promise<IDeveloper> {
		const response = <RequestResponse> await this.Http.get({
			uri: Endpoints.DeveloperAuth,
			qs: { key }
		})
		const body = <IDeveloper> response.body;

		// If there is an error we can just return the body
		if (body.status.error) return body;

		// If there isn't an error then we can set the client as active then return the body
		this.Client = <IClient> { user: false, key };

		return body;
	}
}
