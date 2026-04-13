/**
 * @param {string} locale
 * @param {string} defaultLocale
 * @param {string} [path='']
 */
export function localePath(locale, defaultLocale, path = '') {
	const normalizedPath = path ? `/${path}` : '';
	return locale === defaultLocale ? `/${normalizedPath}`.replace(/\/+/g, '/') : `/${locale}${normalizedPath}`;
}
