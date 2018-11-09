import { SocialBladeClient } from "../client";

import { RequestResponse } from "request";
import { IYouTubeStats } from "../interfaces/ytstatsdata.interface";
import { Endpoints } from "../utils/endpoints";

export class YouTube {
	public $parent: SocialBladeClient;

	public async StatsYouTube (identifier: string): Promise<IYouTubeStats> {
		const response = <RequestResponse> await this.$parent.Http.get({
			uri: Endpoints.YouTubeStats,
			qs: {
				query: `statistics`,
				username: identifier,
				...this.$parent.Client,
			},
		});
		const body = <IYouTubeStats> response.body;

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
		body.charts.subs.subs14 = Number(body.charts.subs.subs14);
		body.charts.subs.subs30 = Number(body.charts.subs.subs30);
		body.charts.subs.subs60 = Number(body.charts.subs.subs60);
		body.charts.subs.subs90 = Number(body.charts.subs.subs90);
		body.charts.subs.subs180 = Number(body.charts.subs.subs180);
		body.charts.subs.subs365 = Number(body.charts.subs.subs365);
		// Views
		body.charts.views.views14 = Number(body.charts.views.views14);
		body.charts.views.views30 = Number(body.charts.views.views30);
		body.charts.views.views60 = Number(body.charts.views.views60);
		body.charts.views.views90 = Number(body.charts.views.views90);
		body.charts.views.views180 = Number(body.charts.views.views180);
		body.charts.views.views365 = Number(body.charts.views.views365);
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
		});
		// #endregion data_daily

		return body;
	}
}
