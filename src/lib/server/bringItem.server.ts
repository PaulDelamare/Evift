import { env } from '$env/dynamic/private';
import { Api } from './api.server';
import type { ApiResponse } from '$lib/models/response.model';
import type { BringItem } from '$lib/models/bringItem.model';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';

export default class BringItemApi extends Api {
     private baseUrl = `${env.API_URL}api/bring`;

     /**
      * Retrieves a list of bring items associated with a specific event.
      *
      * @param eventId - The unique identifier of the event for which to fetch bring items.
      * @returns A promise that resolves to an {@link ApiResponse} containing an array of {@link BringItem} objects.
      * @throws Will rethrow any errors encountered during the fetch operation after logging them with {@link catchErrorRequest}.
      */
     listForEvent = async (eventId: string): Promise<ApiResponse<BringItem[]>> => {
          try {
               const res = await this.fetch(`${this.baseUrl}/list/${eventId}`, {
                    method: 'GET',
                    credentials: 'include'
               });
               return await res.json();
          } catch (error) {
               catchErrorRequest(error, 'BringItemApi.listForEvent');
               throw error;
          }
     };


     /**
      * Creates a new bring item for a specific event.
      *
      * Sends a POST request to the `/create` endpoint with the provided item data.
      * The request includes the event ID, item name, and requested quantity.
      *
      * @param data - An object containing:
      *   - `eventId`: The ID of the event to associate the item with.
      *   - `name`: The name of the item to bring.
      *   - `requestedQuantity`: The quantity requested for the item.
      * @returns A promise that resolves to an `ApiResponse<BringItem>` containing the created item data.
      * @throws Will rethrow any errors encountered during the request after logging them.
      */
     create = async (data: { eventId: string; name: string; requestedQuantity: number }): Promise<ApiResponse<BringItem>> => {
          try {
               const res = await this.fetch(`${this.baseUrl}/create`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify(data)
               });
               return await res.json();
          } catch (error) {
               catchErrorRequest(error, 'BringItemApi.create');
               throw error;
          }
     };


     /**
      * Sends a request to take a specified quantity of a bring item.
      *
      * @param bringItemId - The unique identifier of the bring item to take.
      * @param quantity - The number of items to take.
      * @returns A promise that resolves to an {@link ApiResponse} containing the updated {@link BringItem}.
      * @throws Will throw an error if the request fails.
      */
     take = async (bringItemId: string, quantity: number): Promise<ApiResponse<BringItem>> => {
          try {
               const res = await this.fetch(`${this.baseUrl}/take`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ bringItemId, quantity })
               });
               return await res.json();
          } catch (error) {
               catchErrorRequest(error, 'BringItemApi.take');
               throw error;
          }
     };


     /**
      * Releases a bring item by sending a DELETE request to the server.
      *
      * @param bringItemId - The unique identifier of the bring item to release.
      * @returns A promise that resolves to an {@link ApiResponse} containing the released {@link BringItem}.
      * @throws Will rethrow any error encountered during the request after logging it with {@link catchErrorRequest}.
      */
     release = async (bringItemId: string): Promise<ApiResponse<BringItem>> => {
          try {
               const res = await this.fetch(`${this.baseUrl}/take`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include',
                    body: JSON.stringify({ bringItemId })
               });
               return await res.json();
          } catch (error) {
               catchErrorRequest(error, 'BringItemApi.release');
               throw error;
          }
     };


     /**
      * Deletes an item identified by the given bringItemId.
      *
      * Sends a DELETE request to the server to remove the specified item.
      * Returns a promise that resolves to an ApiResponse indicating whether the deletion was successful.
      *
      * @param bringItemId - The unique identifier of the item to delete.
      * @returns A promise that resolves to an ApiResponse containing a boolean result.
      * @throws Will rethrow any error encountered during the request after logging it.
      */
     deleteItem = async (bringItemId: string): Promise<ApiResponse<boolean>> => {
          try {
               const res = await this.fetch(`${this.baseUrl}/item/${bringItemId}`, {
                    method: 'DELETE',
                    credentials: 'include'
               });
               return await res.json();
          } catch (error) {
               catchErrorRequest(error, 'BringItemApi.deleteItem');
               throw error;
          }
     };
}
