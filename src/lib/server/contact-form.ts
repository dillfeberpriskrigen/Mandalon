import { contactFormLimits } from '$lib/contact-form-limits';
import type { ContactFormContent } from '$lib/content/types';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type ContactFormValues = {
	name: string;
	email: string;
	message: string;
};

export type ContactFormErrors = {
	name?: string;
	email?: string;
	message?: string;
};

export function readContactFormFields(data: FormData): ContactFormValues & { honeypot: string } {
	return {
		name: String(data.get('name') ?? '').trim(),
		email: String(data.get('email') ?? '').trim(),
		message: String(data.get('message') ?? '').trim(),
		honeypot: String(data.get('website') ?? '').trim()
	};
}

export function validateContactForm(values: ContactFormValues, copy: ContactFormContent): ContactFormErrors | null {
	const errors: ContactFormErrors = {};

	if (!values.name || values.name.length > contactFormLimits.name) {
		errors.name = copy.errors.name;
	}

	if (!values.email || values.email.length > contactFormLimits.email || !EMAIL_PATTERN.test(values.email)) {
		errors.email = copy.errors.email;
	}

	if (!values.message || values.message.length < contactFormLimits.messageMin || values.message.length > contactFormLimits.message) {
		errors.message = copy.errors.message;
	}

	return Object.keys(errors).length > 0 ? errors : null;
}
