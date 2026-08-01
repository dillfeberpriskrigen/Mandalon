import type { PageLoad } from './$types';
import { loadLocalePage } from '$lib/content/loadLocalePage';

export const load: PageLoad = ({ params }) => loadLocalePage(params);
