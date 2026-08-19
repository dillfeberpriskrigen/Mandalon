import { getSummary } from '$lib/server/analytics';
import type { PageServerLoad } from './$types';

export const prerender = false;

export const load: PageServerLoad = async () => {
	return {
		summary: await getSummary()
	};
};
