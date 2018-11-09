export interface IUserStatus {
	error: boolean;
	message: string;
	response: number;
};

export interface IUser {
	status: IUserStatus;
};
