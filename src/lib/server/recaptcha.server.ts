// ! IMPORTS
import { env } from '$env/dynamic/private';
import { catchErrorRequest } from '$lib/functions/utils/catchErrorRequest/catchErrorRequest';
import { Api } from './api.server';

// ! Class
export default class CaptchaApi extends Api {

	/**
	 * Verifies a reCAPTCHA token with Google's reCAPTCHA API.
	 * @param captcha - The reCAPTCHA token to verify.
	 * @returns An object containing the verification result and related information.
	 * @throws Will throw an error if the request fails.
	 */
	async captcha(
		captcha: string
	): Promise<{
		success: boolean;
		challenge_ts: string;
		hostname: string;
		score: number;
		action: string;
	}> {
		try {
			const response = await this.fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${env.SERVER_CAPTCHA_KEY}&response=${captcha}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded'
					}
				}
			);

			if (!response.ok) {
				throw new Error(`Captcha verification failed with status ${response.status}`);
			}

			const data = await response.json();

			return data;
		} catch (error) {
			catchErrorRequest(error, 'CaptchaApi.captcha');
			throw error;
		}
	}
}
