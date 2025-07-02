import { describe, it, expect } from 'vitest';
import { executeOrThrow } from './execRequest';

describe('executeOrThrow', () => {
     it('Renvoie les données quand l’appel API réussit', async () => {
          type Data = { foo: string };
          const successResult = { data: { foo: 'bar' } };
          const apiCall = Promise.resolve(successResult);

          await expect(executeOrThrow<Data>(apiCall)).resolves.toEqual(successResult);
     });

     it('Lance une erreur HTTP avec le bon status et message quand l’appel API échoue', async () => {
          const apiError = {
               error: { error: 'Not Found' },
               status: 404
          };
          const apiCall = Promise.resolve(apiError);

          await expect(executeOrThrow(apiCall)).rejects.toMatchObject({
               status: 404,
               body: { message: 'Not Found' }
          });
     });

     it('Renvoie un data vide si la réponse contient une propriété `message`', async () => {
          const fakeApiResponse = { status: 200, message: 'OK' };
          const apiCall = Promise.resolve(fakeApiResponse);

          await expect(executeOrThrow(apiCall)).resolves.toEqual({
               data: {}
          });
     });
});
