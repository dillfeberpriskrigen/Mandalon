import { fail } from '@sveltejs/kit';
import { contactPage } from '$lib/content/pages/contact';
import { readContactFormFields, validateContactForm } from '$lib/server/contact-form';
import { sendContactMessage } from '$lib/server/contact-mail';
import { isContactRateLimited } from '$lib/server/contact-rate-limit';
import type { Actions } from './$types';

export const prerender = false;

export const actions: Actions = {
	default: async ({ request, getClientAddress, params }) => {
		const locale = params.lang === 'en' ? 'en' : 'sv';
		const copy = contactPage[locale].form;
		const fields = readContactFormFields(await request.formData());
		const values = {
			name: fields.name,
			email: fields.email,
			message: fields.message
		};

		if (fields.honeypot) {
			return { success: true as const };
		}

		if (isContactRateLimited(getClientAddress())) {
			return fail(429, { rateLimited: true as const, values });
		}

		const errors = validateContactForm(values, copy);
		if (errors) {
			return fail(400, { errors, values });
		}

		const sent = await sendContactMessage({ ...values, locale });
		if (!sent) {
			return fail(500, { sendFailed: true as const, values });
		}

		return { success: true as const };
	}
};
