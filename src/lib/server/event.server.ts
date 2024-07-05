import { API_URL } from '$env/static/private';
import { Api } from './api.server';
import type { GetAllEvent } from '$lib/models/event.model';

export default class EventApi extends Api<GetAllEvent> {
     // Base url request for auth methods
     private authUrl = `${API_URL}api/event/`;

     /**
     * Asynchronously creates an event.
     * 
     * @param {FormData} body - The data for the event.
     * @returns {Promise<string>} - A promise that resolves to a string representing the data of the created event.
     * @throws {Error} - If there is an error creating the event, an error is thrown with the message 'Error create event : {error}'.
     */
     createEvent = async (body: FormData): Promise<{ data: string; status: number; } | { error: string; status: number; }> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}create`, {
                    method: 'POST',
                    credentials: 'include',
                    // body : body
                    body: body
               });

               // Create Event
               const data: { data: string; status: number } | { error: string; status: number } = await response.json();

               // Return data
               return data;
          } catch (error) {

               // - Catch Errors
               throw new Error('Error create event : ' + error);
          }
     };

     getEvent = async (): Promise<GetAllEvent> => {
          // - Try Validation
          try {
               // Accept or refuse Invitation
               const response = await this.fetch(`${this.authUrl}getAll`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include'
               });

               // Get data
               const data: GetAllEvent | { status: number; error: string; } = await response.json();

               if ("error" in data) {
                    throw new Error(data.error);
               }

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Error in Event Invitation : ' + error);
          }
     };
}
