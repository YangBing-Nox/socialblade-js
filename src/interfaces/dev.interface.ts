export interface IDeveloperStatus {
	error: boolean;
	type: string;
	response: number;
}

export interface IDeveloper {
	status: IDeveloperStatus;
}
