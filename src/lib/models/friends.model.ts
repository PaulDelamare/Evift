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
