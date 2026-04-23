import { redirect } from '@sveltejs/kit';
import { defaultLocale, siteContent } from '$lib/content/site';
import { getLocaleAndPathFromEvent } from '$lib/utils/routing.js'

export const prerender = true;

export function load(event) {
    const {locale, path } = getLocaleAndPathFromEvent(event);

    if (locale == null)
    {
        // Redirect user to the default locale so that a proper page or potentially 404 can be shown
        redirect(301, `/${path}`);
    }

    return {
        path,
        locale,
        defaultLocale,
        content: siteContent[locale ?? defaultLocale] // Ensures that some content is provided, even if locale invalid
    };
}
