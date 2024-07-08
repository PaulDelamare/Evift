import type { Role } from './role.model';
import type { User } from './user.model';

export interface getOneEvent {
	data: {
		id: string;
		id_event: string;
		id_role: string;
		id_user: string;
		createdAt: Date;
		updatedAt: Date;
		user: User;
		event: Event;
		roleRef: Role
	};
	status: number;
}

export interface GetAllEvent {
	data: {
		id: string;
		id_event: string;
		id_role: string;
		id_user: string;
		createdAt: Date;
		updatedAt: Date;
		user: User;
		event: Event;
	}[];
	status: number;
}

export interface Event {
	id: string;
	name: string;
	description: string;
	address: string;
	date: Date;
	img: string;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	time: string;
}

export interface EventInvitation {
	status: number;
	data: {
		id: string;
		id_event: string;
		id_user: string;
		id_organizer: string;
		idOrganizer: User;
		event: Event;
	}[];
}
