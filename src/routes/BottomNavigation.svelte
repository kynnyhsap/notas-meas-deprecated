<script lang="ts">
	import { page } from '$app/stores';

	const items: {
		name: string;
		href: string;
	}[] = [
		// { name: 'Notes', href: '/notes' },
		// { name: 'Podcasts', href: '/podcasts' },
		// { name: 'Books', href: '/books' },
		{ name: 'Feed', href: '/feed' }
	];
</script>

<nav class="w-full fixed bottom-0 flex justify-around bg-gray-400 p-4">
	{#each items as item}
		<a
			href={item.href}
			class:font-bold={$page.url.pathname.split('/')[1] === item.href.replace('/', '')}
			>{item.name}</a
		>
	{/each}
</nav>
