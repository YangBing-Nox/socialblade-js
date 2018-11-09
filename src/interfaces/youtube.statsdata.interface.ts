import { IResponseStatus } from "./common.interface";

export interface IYouTubeStats {
	status: IResponseStatus;
	id: IYouTubeStatsID;
	data?: IYouTubeStatsData;
	rank?: IYouTubeStatsRank;
	charts?: IYouTubeStatsCharts;
	social?: IYouTubeStatsSocial;
	data_daily?: IYouTubeStatsDataDaily[];
};

export interface IYouTubeStatsID {
	type?: string;
	channelid?: string;
	username?: string;
	cusername?: string;
};

export interface IYouTubeStatsData {
	username: string;
	displayname: string;
	created_at: Date;
	uploads: number;
	subs: number;
	views: number;
	country_code: string;
	country: string;
	channeltype: string;
	avatar: string;
	banner: string;
	avgdailysubs: number;
	avgdailyviews: number;
	partner: boolean;
	isVerified: boolean;
};

export interface IYouTubeStatsRank {
	rank: string;
	sbrank: string;
	viewsrank: string;
	countryrank: string;
	channeltyperank: string;
	raw: IYouTubeStatsRankRaw;
	grade_raw: string;
	grade: string;
};

export interface IYouTubeStatsRankRaw {
	rank: number;
	sbrank: number;
	viewsrank: number;
	countryrank: number;
	channeltyperank: number;
};

export interface IYouTubeStatsCharts {
	subs: IYouTubeStatsChartsSubs;
	views: IYouTubeStatsChartsViews;
	growth: IYouTubeStatsChartsGrowth;
};

export interface IYouTubeStatsChartsSubs {
	subs14: number;
	subs30: number;
	subs60: number;
	subs90: number;
	subs180: number;
	subs365: number;
};

export interface IYouTubeStatsChartsViews {
	views14: number;
	views30: number;
	views60: number;
	views90: number;
	views180: number;
	views365: number;
};

export interface IYouTubeStatsChartsGrowth {
	subs: number;
	views: number;
};

export interface IYouTubeStatsSocial {
	googleplus: string;
	facebook: string;
	twitter: string;
	instagram: string;
};

export interface IYouTubeStatsDataDaily {
	date: Date;
	subs: number;
	views: number;
};
