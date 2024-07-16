import type { Participant } from './participant.model';
import type { User } from './user.model';

export interface GetAllLists {
	data: List[];
	status: number;
}

export interface List {
	id: string;
	name: string;
	id_user: string;
	createdAt: Date;
	updatedAt: Date;
	gifts: Gift[];
	user?: User;
}

export interface Gift {
	id: string;
	id_list: string;
	id_user: string;
	taken: boolean;
	id_userTaken: string | null;
	name: string;
	quantity: number;
	url: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface GetEventList {
	data: EventListData[];
	status: number;
}

export interface EventListData {
	id: string;
	id_event: string;
	id_participant: string;
	id_list: string;
	createdAt: Date;
	updatedAt: Date;
	list: List;
	participant: Participant;
}

export interface GetEventListDetail {
	status: number;
	data: EventListData;
}

export interface EventList {
	id: string;
	id_event: string;
	id_participant: string;
	id_list: string;
	createdAt: Date;
	updatedAt: Date;
	list: List;
}
