import { env } from '$env/dynamic/private';
import nodemailer from 'nodemailer';
import type { Locale } from '$lib/content/types';

function readEnv(name: string): string | undefined {
	const value = env[name] ?? process.env[name];
	return value?.trim() ? value.trim() : undefined;
}

export type ContactMessage = {
	name: string;
	email: string;
	message: string;
	locale: Locale;
};

export async function sendContactMessage(input: ContactMessage): Promise<boolean> {
	const host = readEnv('SMTP_HOST');
	const user = readEnv('SMTP_USER');
	const pass = env.SMTP_PASS ?? process.env.SMTP_PASS;
	const to = readEnv('CONTACT_TO');
	const port = Number(readEnv('SMTP_PORT') || '587');
	const from = readEnv('SMTP_FROM') || user;

	if (!host || !user || !pass || !to || !from || Number.isNaN(port)) {
		const missing = [
			!host && 'SMTP_HOST',
			!user && 'SMTP_USER',
			!pass && 'SMTP_PASS',
			!to && 'CONTACT_TO',
			!from && 'SMTP_FROM',
			Number.isNaN(port) && 'SMTP_PORT'
		].filter((key): key is string => Boolean(key));
		console.error(`contact-mail: missing SMTP configuration (${missing.join(', ')})`);
		return false;
	}

	const transporter = nodemailer.createTransport({
		host,
		port,
		secure: port === 465,
		auth: { user, pass },
		connectionTimeout: 10_000,
		greetingTimeout: 10_000,
		socketTimeout: 15_000
	});

	const subject = input.locale === 'en' ? `Website enquiry from ${input.name}` : `Webbfråga från ${input.name}`;
	const text =
		input.locale === 'en'
			? `Name: ${input.name}\nEmail: ${input.email}\n\nMessage:\n${input.message}\n`
			: `Namn: ${input.name}\nE-post: ${input.email}\n\nMeddelande:\n${input.message}\n`;

	try {
		await transporter.sendMail({
			from,
			to,
			replyTo: input.email,
			subject,
			text
		});
		return true;
	} catch (error) {
		const detail = error instanceof Error ? error.message : 'unknown error';
		console.error(`contact-mail: send failed (${detail})`);
		return false;
	}
}
