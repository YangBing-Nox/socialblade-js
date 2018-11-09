import { IResponseStatus } from "./common.interface";

export interface ITwitchStats {
	status: IResponseStatus;
	id: ITwitchStatsID;
	data?: ITwitchStatsData;
	rank?: ITwitchStatsRank;
	data_daily?: ITwitchStatsDataDaily[];
};

export interface ITwitchStatsID {
	results: number;
	twitch_id: string;
	username: string;
};

export interface ITwitchStatsData {
	username: string;
	game: string;
	status: string;
	avatar: string;
	banner: string;
	followers: number;
	followersdaygain: number;
	followersmonthgain: number;
	avgdailyfollowers: number;
	views: number;
	viewsdaygain: number;
	viewsmonthgain: number;
	avgdailyviews: number;
	created_at: Date;
	isVerified: boolean;
};

export interface ITwitchStatsRank {
	rank: number;
	vidviewrank: number;
	grade: ITwitchStatsRankGrade;
};

export interface ITwitchStatsRankGrade {
	raw: number;
	grade: string;
	display: string;
};

export interface ITwitchStatsDataDaily {
	date: Date;
	followers: number;
	views: number;
};
