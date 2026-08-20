import type { RequestHandler } from './$types';
import { buildLlmsTxt } from '$lib/llms-txt';

export const prerender = true;

export const GET: RequestHandler = () => {
	return new Response(buildLlmsTxt(), {
		headers: {
			'Content-Type': 'text/markdown; charset=utf-8'
		}
	});
};
