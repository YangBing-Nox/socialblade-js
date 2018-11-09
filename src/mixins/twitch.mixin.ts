import { SocialBladeClient } from "../client";

import { RequestResponse } from "request";
import { ITwitchStats } from "../interfaces/twitch.statsdata.interface";
import { Endpoints } from "../utils/endpoints";

export class Twitch {
	public $parent: SocialBladeClient;

	public async StatsTwitch (identifier: string): Promise<ITwitchStats> {
		const response = <RequestResponse> await this.$parent.Http.get({
			uri: Endpoints.TwitchStats,
			qs: {
				query: `statistics`,
				username: identifier,
				...this.$parent.Client,
			},
		});
		const body = <ITwitchStats> response.body;

		// Set proper types since everything is a string in the API.
		// #region data
		if (!body.data) return body;
		// toDate
		body.data.created_at = new Date(body.data.created_at);
		// toBoolean
		body.data.isVerified = !!+body.data.isVerified;
		// toFloat
		body.data.avgdailyfollowers = parseFloat(body.data.avgdailyfollowers.toString());
		body.data.avgdailyviews = parseFloat(body.data.avgdailyviews.toString());
		// toNumber
		body.data.followers = Number(body.data.followers);
		body.data.views = Number(body.data.views);
		// #endregion data

		// #region rank
		if (!body.rank) return body;
		// toNumber
		body.rank.rank = Number(body.rank.rank);
		body.rank.vidviewrank = Number(body.rank.vidviewrank);
		body.rank.grade.raw = Number(body.rank.grade.raw);
		// #endregion rank

		// #region data_daily
		if (!body.data_daily) return body;
		body.data_daily.map(item => {
			item.date = new Date(item.date);
			item.followers = Number(item.followers);
			item.views = Number(item.views);
		})
		// #endregion data_daily

		return body;
	}
}
