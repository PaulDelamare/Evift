import type { Role } from './role.model';
import type { User } from './user.model';

export interface Participant {
	id: string;
	id_event: string;
	id_role: string;
	id_user: string;
	createdAt: Date;
	updatedAt: Date;
	user: User;
	roleRef: Role;
}

export interface InviteUser {
	id: string;
	id_event: string;
	id_user: string;
	id_organizer: string;
	createdAt: Date;
	user: User;
	updatedAt: Date;
	roleRef: Role;
	id_role: string;
}
