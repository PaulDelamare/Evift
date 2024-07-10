import { API_URL } from '$env/static/private';
import { Api } from './api.server';
import type { GetAllLists, GetEventList, GetEventListDetail } from '$lib/models/gift.model';

export default class GiftApi extends Api<GetAllLists> {
     // Base url request for auth methods
     private authUrl = `${API_URL}api/gift/`;

     /**
      * Creates a list.
      *
      * @param body - The request body.
      * @param body.name - The name of the list.
      * @param body.gifts - The gifts in the list.
      * @param body.gifts[].name - The name of the gift.
      * @param body.gifts[].quantity - The quantity of the gift.
      * @param body.gifts[].url - The URL of the gift.
      * @return A promise that resolves to an object with the following properties:
      *   - message?: string - An optional message.
      *   - error?: string - An optional error message.
      *   - status: number - The status code.
      * @throws {Error} If there is an error creating the list.
      */
     createList = async (body: { name: string; gifts: { name: string; quantity: number; url: string }[] }): Promise<{ message?: string; error?: string; status: number }> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}create`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify(body)
               });

               // Get Friends
               const data: { message?: string; error?: string; status: number } = await response.json();

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Error Get Friends By EMAIL : ' + error);
          }
     };

     // Find all gift
     findAll = async (): Promise<GetAllLists> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}findAll`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include'
               });

               // Get Gift
               const data: GetAllLists = await response.json();

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Error Get Friends By EMAIL : ' + error);
          }
     };

     findForEvent = async (id_event: string): Promise<GetEventList> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}findListEvent/${id_event}`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include'
               });

               // Get Gift
               const data: GetEventList = await response.json();

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Get Gift : ' + error);
          }
     };

     addListEvent = async (idEvent: string, idList: string ): Promise<{ message?: string; error?: string; status: number }> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}listEvent`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ idEvent, idList })
               });

               // Get Friends
               const data: { message?: string; error?: string; status: number } = await response.json();

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Error Add List To Event : ' + error);
          }
     };

     deleteListEvent = async (idEvent: string, idList: string ): Promise<{ message?: string; error?: string; status: number }> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}deleteListEvent`, {
                    method: 'DELETE',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ idEvent, idList })
               });

               // Get Friends
               const data: { message?: string; error?: string; status: number } = await response.json();

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Error Add List To Event : ' + error);
          }
     };

     findList = async (idList: string): Promise<GetEventListDetail> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}findList/${idList}`, {
                    method: 'GET',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include'
               });

               // Get Gift
               const data: GetEventListDetail = await response.json();

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Get Gift : ' + error);
          }
     };

     checkGift = async (idEvent: string, idGift: string, checked: boolean ): Promise<{ message?: string; error?: string; status: number }> => {
          // - Try Validation
          try {
               // Do request
               const response = await this.fetch(`${this.authUrl}checkGift`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({ idEvent, idGift, checked })
               });

               // Get Friends
               const data: { message?: string; error?: string; status: number } = await response.json();

               // Return data
               return data;
          } catch (error) {
               // - Catch Errors
               throw new Error('Error Add List To Event : ' + error);
          }
     };
}
