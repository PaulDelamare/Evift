// ! IMPORTS
import { SERVER_CAPTCHA_KEY } from '$env/static/private';
import { Api } from './api.server';

// ! Class
export default class CaptchaApi extends Api<{success: boolean; challenge_ts: string; hostname: string; score: 0.9; action: string}> {

     // - Create recapctha request validator
     captcha = async (captcha: string): Promise<{success: boolean; challenge_ts: string; hostname: string; score: 0.9; action: string}> => {
          // ? Try request
          try {
               // Define request
               // Pass recapctah validator key and captcha token
               const response = await this.fetch(`https://www.google.com/recaptcha/api/siteverify?secret=${SERVER_CAPTCHA_KEY}&response=${captcha}`, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json'
                    },
                    // Need to include credentials for have x-api-key in request with hooks
                    credentials: 'include'
               });

               // Get data response
               const data: {success: boolean; challenge_ts: string; hostname: string; score: 0.9; action: string} = await response.json();

               // Return data
               return data;
          } 
          // ? Catch Request
          catch (error) {
               // Throw error
               throw new Error('Error captcha : ' + error);
          }
     };


}
