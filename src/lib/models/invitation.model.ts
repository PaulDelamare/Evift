export interface Invitation {
	id: string;
	userId: string;
	requestId: string;
	createdAt: Date;
	user: {
		id: string;
		email: string;
		firstname: string;
		lastname: string;
	};
}
