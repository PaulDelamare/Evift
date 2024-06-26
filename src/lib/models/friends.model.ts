export interface GetAllFriends {
     data: Friends[]
     status: number;
}

export interface Friends {
     id: string;
     created_at: string;
     userId: string;
     user: {
          id: string;
          email: string;
          firstname: string;
          lastname: string;
     }
}