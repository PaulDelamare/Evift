import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { Role } from '$lib/models/role.model';
import type { ApiResponse } from '$lib/models/response.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class RequestAccountApi extends Api {

     private authUrl = `${env.API_URL}api/requestAccount/`;

     /**
      * Retrieves all roles from the server.
      *
      * Sends a GET request to the `${this.authUrl}findAll` endpoint to fetch all available roles.
      * The request includes credentials and expects a JSON response.
      *
      * @returns A promise that resolves to an {@link ApiResponse} containing an array of {@link Role} objects.
      * @throws Rethrows any error encountered during the request after logging it with {@link catchErrorRequest}.
      */
     requestAccount = async (email: string, id_event: string | null): Promise<ApiResponse> => {

          try {
               const response = await this.fetch(`${this.authUrl}`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ email, id_event })
               });

               const data: ApiResponse<Role[]> = await response.json();
               return data;

          } catch (error) {

               catchErrorRequest(error, 'RequestAccountApi.requestAccount');
               throw error;
          }
     };

     /**
      * Checks the validity of an account request using the provided email and token.
      *
      * Sends a GET request to the authentication server to verify the account request.
      * Returns the API response as a Promise.
      *
      * @param email - The email address associated with the account request.
      * @param token - The token to validate the account request.
      * @returns A promise that resolves to an {@link ApiResponse} containing the result of the check.
      * @throws Will throw an error if the request fails or an exception occurs.
      */
     checkRequest = async (email: string, token: string): Promise<ApiResponse> => {
          try {
               const response = await this.fetch(`${this.authUrl}check/${email}/${token}`, {
                    method: 'GET',
                    credentials: 'include'
               });


               const data: ApiResponse = await response.json();
               return data;

          } catch (error) {

               catchErrorRequest(error, 'RequestAccountApi.checkRequest');
               throw error;
          }
     }

     /**
      * Sends a request to create a new user account with the provided details.
      *
      * @param body - An object containing the user's email, first name, last name, token, and password.
      * @returns A promise that resolves to an `ApiResponse` indicating the result of the account creation.
      * @throws Throws an error if the request fails.
      */
     createRequestAccount = async (body: { email: string, firstname: string, lastname: string, token: string, password: string }): Promise<ApiResponse> => {
          try {
               const response = await this.fetch(`${this.authUrl}createAccount`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(body)
               });

               const data: ApiResponse = await response.json();
               return data;

          } catch (error) {

               catchErrorRequest(error, 'RequestAccountApi.createRequestAccount');
               throw error;
          }
     }
}
