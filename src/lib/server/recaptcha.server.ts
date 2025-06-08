// ! IMPORTS
import { env } from '$env/dynamic/private';
import { Api } from './api.server';

// ! Class
export default class CaptchaApi extends Api {

	captcha = async (
		captcha: string
	): Promise<{
		success: boolean;
		challenge_ts: string;
		hostname: string;
		score: 0.9;
		action: string;
	}> => {

		try {

			const response = await this.fetch(
				`https://www.google.com/recaptcha/api/siteverify?secret=${env.SERVER_CAPTCHA_KEY}&response=${captcha}`,
				{
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					credentials: 'include'
				}
			);

			const data: {
				success: boolean;
				challenge_ts: string;
				hostname: string;
				score: 0.9;
				action: string;
			} = await response.json();

			return data;

		} catch (error) {

			throw new Error('Error captcha : ' + error);
		}
	};
}
