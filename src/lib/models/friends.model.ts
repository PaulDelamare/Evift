export interface GetAllFriends {
	data: Friends[];
	status: number;
}

export interface Friends {
	id: string;
	createdAt: Date;
	userId: string;
	user: {
		id: string;
		email: string;
		firstname: string;
		lastname: string;
	};
}
