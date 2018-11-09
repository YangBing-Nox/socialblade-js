import { IResponseStatus } from "./common.interface";

export interface ITwitterStats {
	status: IResponseStatus;
	user: ITwitterStatsUser;
	average?: ITwitterStatsAverage;
	rank?: ITwitterStatsDataRank;
	charts?: ITwitterStatsDataCharts;
	statistics?: ITwitterStatsDataStatistics[];
};

export interface ITwitterStatsUser {
	twitter_id: number;
	full_name: string;
	username: string;
	design: ITwitterStatsUserDesign;
	created_at: Date;
	website?: string;
	followers: number;
	following: number;
	tweets: number;
	favorites: number;
	isVerified: boolean;
	isStaff: boolean;
	recent_tweet?: ITwitterStatsUserRecentTweet;
};

export interface ITwitterStatsUserDesign {
	picture: string;
	banner: string;
	color: string;
};

export interface ITwitterStatsUserRecentTweet {
	id: number;
	url: string;
};

export interface ITwitterStatsAverage {
	retweets: number;
	favourites: number;
	daily: ITwitterStatsAverageDaily;
};

export interface ITwitterStatsAverageDaily {
	followers: number;
	following: number;
};

export interface ITwitterStatsDataRank {
	grade: string;
	rank: string;
	raw: ITwitterStatsDataRankRaw;
};

export interface ITwitterStatsDataRankRaw {
	grade: string;
	rank: number;
};

export interface ITwitterStatsDataCharts {
	followers: ITwitterStatsDataChartsPeriods;
	following: ITwitterStatsDataChartsPeriods;
};

export interface ITwitterStatsDataChartsPeriods {
	week: number;
	month: number;
	year: number;
};

export interface ITwitterStatsDataStatistics {
	date: Date;
	followers: number;
	following: number;
	tweets: number;
	favorites: number;
};