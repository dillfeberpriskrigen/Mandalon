<script lang="ts">
	import { enhance } from '$app/forms';
	import { beforeNavigate } from '$app/navigation';
	import Button from '$lib/components/primitives/Button.svelte';
	import Heading from '$lib/components/typography/Heading.svelte';
	import Link from '$lib/components/typography/Link.svelte';
	import Text from '$lib/components/typography/Text.svelte';
	import { contactFormLimits } from '$lib/contact-form-limits';
	import type { ContactFormActionData, ContactFormContent } from '$lib/content/types';

	type Props = {
		copy: ContactFormContent;
		privacyHref: string;
		form: ContactFormActionData;
	};

	let { copy, privacyHref, form }: Props = $props();
	let submitting = $state(false);
	// Seed from a no-JS validation POST; bind:value owns the draft after that.
	// svelte-ignore state_referenced_locally
	let draft = $state({
		name: form?.values?.name ?? '',
		email: form?.values?.email ?? '',
		message: form?.values?.message ?? ''
	});

	const errors = $derived(form?.errors ?? {});
	const submitLabel = $derived(submitting ? copy.sendingLabel : copy.submitLabel);
	const dirty = $derived(!form?.success && (draft.name.trim() !== '' || draft.email.trim() !== '' || draft.message.trim() !== ''));

	beforeNavigate(({ cancel, type }) => {
		if (!dirty) {
			return;
		}

		if (type === 'leave') {
			cancel();
			return;
		}

		if (!confirm(copy.leaveWarning)) {
			cancel();
		}
	});
</script>

<div class="contact-form">
	{#if form?.success}
		<div class="form-success" role="status">
			<svg class="form-success-icon" viewBox="0 0 24 24" aria-hidden="true">
				<circle cx="12" cy="12" r="10.25" fill="none" stroke="currentColor" stroke-width="1.5" />
				<path d="M7.25 12.25 10.4 15.4 16.75 8.75" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
			</svg>
			<Heading as="h2">{copy.successTitle}</Heading>
			<Text as="p" variant="lead">{copy.success}</Text>
			<Text as="p" variant="lead">{copy.successUrgent}</Text>
		</div>
	{:else}
		<Heading as="h2">{copy.title}</Heading>
		<Text as="p">{copy.intro}</Text>

		<form
			class="form form-stack"
			method="POST"
			novalidate
			use:enhance={() => {
				submitting = true;
				return async ({ update }) => {
					submitting = false;
					await update({ reset: false });
				};
			}}
		>
			<div class="form-honeypot" aria-hidden="true">
				<label for="contact-website">Website</label>
				<input id="contact-website" name="website" type="text" tabindex="-1" autocomplete="off" />
			</div>

			<div class="form-field">
				<label for="contact-name"><Text variant="label">{copy.nameLabel}</Text></label>
				<input
					id="contact-name"
					class="form-input"
					name="name"
					type="text"
					autocomplete="name"
					required
					maxlength={contactFormLimits.name}
					bind:value={draft.name}
					aria-invalid={errors.name ? 'true' : undefined}
					aria-describedby={errors.name ? 'contact-name-error' : undefined}
				/>
				{#if errors.name}
					<Text as="p" variant="caption">
						<span id="contact-name-error" class="form-error">{errors.name}</span>
					</Text>
				{/if}
			</div>

			<div class="form-field">
				<label for="contact-email"><Text variant="label">{copy.emailFieldLabel}</Text></label>
				<input
					id="contact-email"
					class="form-input"
					name="email"
					type="email"
					autocomplete="email"
					required
					maxlength={contactFormLimits.email}
					bind:value={draft.email}
					aria-invalid={errors.email ? 'true' : undefined}
					aria-describedby={errors.email ? 'contact-email-error' : undefined}
				/>
				{#if errors.email}
					<Text as="p" variant="caption">
						<span id="contact-email-error" class="form-error">{errors.email}</span>
					</Text>
				{/if}
			</div>

			<div class="form-field">
				<label for="contact-message"><Text variant="label">{copy.messageLabel}</Text></label>
				<textarea
					id="contact-message"
					class="form-textarea"
					name="message"
					required
					minlength={contactFormLimits.messageMin}
					maxlength={contactFormLimits.message}
					bind:value={draft.message}
					aria-invalid={errors.message ? 'true' : undefined}
					aria-describedby={errors.message ? 'contact-message-error' : undefined}
				></textarea>
				{#if errors.message}
					<Text as="p" variant="caption">
						<span id="contact-message-error" class="form-error">{errors.message}</span>
					</Text>
				{/if}
			</div>

			{#if form?.sendFailed}
				<Text as="p" variant="caption">
					<span class="form-error" role="alert">{copy.sendFailed}</span>
				</Text>
			{/if}

			{#if form?.rateLimited}
				<Text as="p" variant="caption">
					<span class="form-error" role="alert">{copy.rateLimited}</span>
				</Text>
			{/if}

			<Text as="p" variant="caption">
				{copy.privacy.before}<Link href={privacyHref}>{copy.privacy.link}</Link>{copy.privacy.after}
			</Text>

			<Button type="submit" disabled={submitting}>{submitLabel}</Button>
		</form>
	{/if}
</div>

<style>
	.contact-form {
		display: grid;
		gap: var(--space-medium);
	}

	.form-success {
		display: grid;
		justify-items: start;
		gap: var(--space-medium);
	}

	.form-success-icon {
		width: 2.75rem;
		height: 2.75rem;
	}
</style>
