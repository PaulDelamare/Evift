export interface DataRole {
	data: Role[];
	status: number;
}

export interface Role {
     id: string;
     name: string;
     createdAt: Date
}