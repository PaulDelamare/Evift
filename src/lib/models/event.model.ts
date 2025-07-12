import type { Role } from './role.model';
import type { User } from './user.model';

export interface Event {
	id: string;
	id_event: string;
	id_role: string;
	id_user: string;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	event: EventDetail;
	roleRef?: Role;
	idDriver?: string;
}

export interface EventDetail {
	id: string;
	name: string;
	description: string;
	address: string;
	date: Date;
	userId: string;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	time: string;
	idDriver?: string;
}

export interface EventInvitation {
	id: string;
	id_event: string;
	id_user: string;
	id_organizer: string;
	idOrganizer: User;
	event: EventDetail;
}
