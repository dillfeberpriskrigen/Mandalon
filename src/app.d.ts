// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module 'svelte/elements' {
	// T must match svelte/elements HTMLAttributes so this augments instead of replacing it.
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	export interface HTMLAttributes<T> {
		'x-apple-data-detectors'?: 'true' | 'false';
	}
}

export {};
