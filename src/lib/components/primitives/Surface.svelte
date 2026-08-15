<script lang="ts">
	type Variant = 'default' | 'muted' | 'accent' | 'warning';
	type Radius = 'none' | 'small' | 'medium' | 'large';
	type Padding = 'none' | 'small' | 'medium' | 'large';
	type Shadow = 'none' | 'small' | 'medium';

	type Props = {
		as?: 'div' | 'section' | 'article' | 'header';
		variant?: Variant;
		radius?: Radius;
		padding?: Padding;
		shadow?: Shadow;
		id?: string;
		children: import('svelte').Snippet;
	};

	let { as = 'div', variant = 'default', radius = 'medium', padding = 'medium', shadow = 'none', id, children }: Props = $props();
</script>

<svelte:element this={as} {id} class={['surface', `surface-${variant}`, `surface-radius-${radius}`, `surface-padding-${padding}`, `surface-shadow-${shadow}`]}>
	{@render children()}
</svelte:element>
