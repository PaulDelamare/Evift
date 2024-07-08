import type { Role } from "./role.model";
import type { User } from "./user.model";


export interface DataAllParticipants {
     data: Participant[];
     status: number;
}
export interface Participant {
     id: string;
     id_event: string;
     id_role: string;
     id_user: string;
     createdAt: Date;
     updatedAt: Date;
     user: User,
     roleRef: Role
}