import { RequestAPI, RequestResponse, RequiredUriUrl } from 'request';
import * as request from 'request-promise-native';

import { IClient } from './interfaces/client.interface';
import { IUser } from './interfaces/user.interface';
import { IDeveloper } from './interfaces/dev.interface';
import { IYouTubeStats } from './interfaces/ytstatsdata.interface';

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

	public async StatsYouTube (identifier: string): Promise<IYouTubeStats> {
		const response = <RequestResponse> await this.Http.get({
			uri: Endpoints.YouTubeStats,
			qs: {
				query: `statistics`,
				username: identifier,
				...this.Client
			}
		});
		let body = <IYouTubeStats> response.body;

		// Set proper types since everything is a string in the API.
		// #region data
		if (!body.data) return body;
		// toDate
		body.data.created_at = new Date(body.data.created_at);
		// toBoolean
		body.data.partner = !!+body.data.partner;
		body.data.isVerified = !!+body.data.isVerified;
		// toFloat
		body.data.avgdailysubs = parseFloat(body.data.avgdailysubs.toString());
		body.data.avgdailyviews = parseFloat(body.data.avgdailyviews.toString());
		// toNumber
		body.data.uploads = Number(body.data.uploads);
		body.data.subs = Number(body.data.subs);
		body.data.views = Number(body.data.views);
		// #endregion data

		// #region rank
		if (!body.rank) return body;
		// toNumber
		body.rank.raw.rank = Number(body.rank.raw.rank);
		body.rank.raw.sbrank = Number(body.rank.raw.sbrank);
		body.rank.raw.viewsrank = Number(body.rank.raw.viewsrank);
		body.rank.raw.countryrank = Number(body.rank.raw.countryrank);
		body.rank.raw.channeltyperank = Number(body.rank.raw.channeltyperank);
		// #endregion rank

		// #region charts
		if (!body.charts) return body;
		// toNumber -- Subs
		body.charts.subs.subs14 = Number(body.charts.subs.subs14)
		body.charts.subs.subs30 = Number(body.charts.subs.subs30)
		body.charts.subs.subs60 = Number(body.charts.subs.subs60)
		body.charts.subs.subs90 = Number(body.charts.subs.subs90)
		body.charts.subs.subs180 = Number(body.charts.subs.subs180)
		body.charts.subs.subs365 = Number(body.charts.subs.subs365)
		// Views
		body.charts.views.views14 = Number(body.charts.views.views14)
		body.charts.views.views30 = Number(body.charts.views.views30)
		body.charts.views.views60 = Number(body.charts.views.views60)
		body.charts.views.views90 = Number(body.charts.views.views90)
		body.charts.views.views180 = Number(body.charts.views.views180)
		body.charts.views.views365 = Number(body.charts.views.views365)
		// toFloat -- Growth
		body.charts.growth.subs = parseFloat(body.charts.growth.subs.toString());
		body.charts.growth.views = parseFloat(body.charts.growth.views.toString());
		// #endregion charts

		// #region data_daily
		if (!body.data_daily) return body;
		body.data_daily.map(item => {
			item.date = new Date(item.date);
			item.subs = Number(item.subs);
			item.views = Number(item.views);
		})
		// #endregion data_daily

		return body;
	}
}
