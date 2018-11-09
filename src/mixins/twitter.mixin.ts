import { SocialBladeClient } from "../client";

import { RequestResponse } from "request";
import { ITwitterStats } from "../interfaces/twitter.statsdata.interface";
import { Endpoints } from "../utils/endpoints";

export class Twitter {
	public $parent: SocialBladeClient;

	public async StatsTwitter (identifier: string): Promise<ITwitterStats> {
		const response = <RequestResponse> await this.$parent.Http.get({
			uri: Endpoints.TwitterStats,
			qs: {
				query: `statistics`,
				username: identifier,
				...this.$parent.Client,
			},
		});
		const body = <ITwitterStats> response.body;

		// Set proper types since everything is a string in the API.
		// #region user
		if (!body.user) return body;
		// toDate
		body.user.created_at = new Date(body.user.created_at);
		// toBoolean
		body.user.isVerified = !!+body.user.isVerified;
		body.user.isStaff = !!+body.user.isStaff;
		// toNumber
		body.user.twitter_id = Number(body.user.twitter_id);
		body.user.followers = Number(body.user.followers);
		body.user.following = Number(body.user.following);
		body.user.tweets = Number(body.user.tweets);
		body.user.favorites = Number(body.user.favorites);
		if (body.user.recent_tweet) body.user.recent_tweet.id = Number(body.user.recent_tweet.id);
		// #endregion user

		// #region average/rank/charts
		if (!body.average) return body;
		body.average.retweets = Number(body.average.retweets);
		body.average.favourites = Number(body.average.favourites);
		body.average.daily.followers = Number(body.average.daily.followers);
		body.average.daily.following = Number(body.average.daily.following);
		if (body.rank && body.rank.raw) body.rank.raw.rank = Number(body.rank.raw.rank);
		if (body.charts) {
			// followers
			body.charts.followers.week = Number(body.charts.followers.week);
			body.charts.followers.month = Number(body.charts.followers.month);
			body.charts.followers.year = Number(body.charts.followers.year);
			// following
			body.charts.following.week = Number(body.charts.following.week);
			body.charts.following.month = Number(body.charts.following.month);
			body.charts.following.year = Number(body.charts.following.year);
		}
		// #endregion average/rank/charts

		// #region statistics
		if (!body.statistics) return body;
		body.statistics.map(item => {
			item.date = new Date(item.date);
			item.followers = Number(item.followers);
			item.following = Number(item.following);
			item.tweets = Number(item.tweets);
			item.favorites = Number(item.favorites);
		})
		// #endregion statistics

		return body;
	}
}
