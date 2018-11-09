import { RequestAPI, RequestResponse, RequiredUriUrl } from 'request';
import * as request from 'request-promise-native';

import { IClient } from './interfaces/client.interface';
import { IUser } from './interfaces/user.interface';
import { IDeveloper } from './interfaces/dev.interface';
import { IYouTubeStats } from './interfaces/ytstatsdata.interface';

import { Endpoints } from './utils/endpoints';

import { YouTube } from './mixins/index';
const mixins = [ YouTube ];
export class SocialBladeClient implements YouTube {
	public $parent: SocialBladeClient = this;

	public Http: RequestAPI<request.RequestPromise, request.RequestPromiseOptions, RequiredUriUrl>;
	public Client: IClient;

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
				"User-Agent": this.UserAgent,
				"Authorization": this.Client.user ? `${this.Client.email}::${this.Client.token}` : this.Client.key
			}
		});
	}

	public isAuthed (): boolean { return this.Client.user !== undefined || this.Client.key !== undefined }

	public async AuthAsUser (email: IClient['email'], token: IClient['token']): Promise<IUser> {
		const response = <RequestResponse> await this.Http.get({
			uri: Endpoints.UserAuth,
			qs: { email, token }
		});
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
		});
		const body = <IDeveloper> response.body;

		// If there is an error we can just return the body
		if (body.status.error) return body;

		// If there isn't an error then we can set the client as active then return the body
		this.Client = <IClient> { user: false, key };

		return body;
	}

	StatsYouTube: (identifier: string) => Promise<IYouTubeStats>;
}

// Invoke Mixins
const base: any = SocialBladeClient;
mixins.map((mixin: any) => {
	Object.getOwnPropertyNames(mixin.prototype).map(name => { base.prototype[name] = mixin.prototype[name]; });
});
