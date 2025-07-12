export interface User {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
	error?: string;
	firstLogin?: boolean;
}

export interface PostUser {
	firstname: string;
	lastname: string;
	email: string;
	password: string;
}

export interface GetUser {
	id: string;
	userId: string;
	createdAt: Date;
	user: {
		id: string;
		email: string;
		firstname: string;
		lastname: string;
	};
}
