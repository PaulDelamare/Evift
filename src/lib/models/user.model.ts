export interface LoginResponse {
	accessToken: string;
     data: {
          user: User;
          accessToken: string;
     }
     status: number;
}

export interface User{
     firstname: string;
     lastname: string;
     email: string;
     password: string;
     createdAt?: Date;
     updatedAt?: Date;
 }

export interface PostUser {
     firstName: string;
     lastname: string;
     email: string;
     password: string;
}
