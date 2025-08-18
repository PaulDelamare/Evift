import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class ForgotPasswordApi extends Api {

     private authUrl = `${env.API_URL}api/auth/`;

     /**
      * Sends a request to generate a password reset for the specified email address.
      *
      * @param email - The email address for which to generate a password reset.
      * @returns A promise that resolves to an {@link ApiResponse} containing the result of the password reset request.
      * @throws Will rethrow any error encountered during the request after logging it with {@link catchErrorRequest}.
      * @throws Will rethrow any error encountered during the request after logging it with {@link catchErrorRequest}.
      */
     generatePasswordReset = async (
          email: string
     ): Promise<ApiResponse> => {
          try {
               const response = await this.fetch(`${this.authUrl}generatePasswordReset`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({

                         email,
                    })
               });

               return response.json();

          } catch (error) {
               catchErrorRequest(error, 'ForgotPasswordApi.generatePasswordReset');
               throw error;
          }
     };

     /**
      * Sends a GET request to verify a user's password reset request using a token and user ID.
      *
      * @param token - The password reset token to validate.
      * @param userId - The ID of the user requesting password reset.
      * @returns A promise that resolves to an {@link ApiResponse} containing the result of the verification.
      * @throws Will rethrow any error encountered during the request after logging it with {@link catchErrorRequest}.
      */
     checkUserRequest = async (token: string, userId: string): Promise<ApiResponse> => {

          try {
               const response = await this.fetch(`${this.authUrl}checkUserRequest?token=${token}&userId=${userId}`, {
                    method: 'GET',
                    credentials: 'include'

               });

               return response.json();

          } catch (error) {
               catchErrorRequest(error, 'ForgotPasswordApi.checkUserRequest');
               throw error;
          }
     };

     /**
      * Changes the user's password using a provided token, user ID, and new password.
      *
      * Sends a POST request to the authentication service to update the user's password.
      * The request includes the token for verification, the user's ID, and the new password.
      * Returns the JSON response from the authentication service.
      *
      * @param body - An object containing:
      *   - `token`: The password reset token.
      *   - `userId`: The ID of the user whose password is being changed.
      *   - `password`: The new password to set.
      * @returns A promise that resolves to the JSON response from the authentication service.
      * @throws Throws an error if the request fails.
      */
     changePassword = async (body: { token: string, userId: string, password: string }) => {
          try {
               const response = await this.fetch(`${this.authUrl}changePassword`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(body)
               });

               return response.json();

          } catch (error) {
               catchErrorRequest(error, 'ForgotPasswordApi.changePassword');
               throw error;
          }
     }
}