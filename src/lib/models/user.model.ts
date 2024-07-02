export interface LoginResponse {
	accessToken: string;
	data: {
		user: User;
		accessToken: string;
	};
	status: number;
}

export interface User {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	createdAt?: Date;
	updatedAt?: Date;
	error?: string;
}

export interface DataUser {
	data: User;
	status: number;
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
