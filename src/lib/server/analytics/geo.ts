import { lookup as lookupCountry } from 'geoip-country';

const LOCAL_IP = /^(?:127\.|10\.|192\.168\.|172\.(?:1[6-9]|2\d|3[01])\.|::1$|fc|fd|fe80)/i;

export function countryFromAddress(ip: string | undefined): string | null {
	if (!ip) {
		return null;
	}

	const candidate = ip.trim().replace(/^::ffff:/i, '');
	if (!candidate || LOCAL_IP.test(candidate)) {
		return null;
	}

	try {
		const result = lookupCountry(candidate);
		const country = result?.country?.trim().toUpperCase();
		return country && /^[A-Z]{2}$/.test(country) ? country : null;
	} catch {
		return null;
	}
}
