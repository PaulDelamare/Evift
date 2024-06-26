export interface GetCountFriendInvitation {
    data: number
    status: number;
}

export interface InvitationData{
    data: Invitation[];
    status: number;
}

export interface Invitation {
    id: string;
    userId: string;
    requestId: string;
    createdAt: Date
    user: {
        id: string;
        email: string;
        firstname: string;
        lastname: string;
    }
}
