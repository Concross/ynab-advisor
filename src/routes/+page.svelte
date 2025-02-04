<script lang="ts">
	import { onMount } from 'svelte';

	type Budget = {
		id: string;
		name: string;
		last_modified_on: string;
	};

	let budgets: Budget[] = [];
	let error: string | null = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/ynab/budgets');
			if (!response.ok) throw new Error('Failed to fetch budgets');
			const data: { budgets: Budget[] } = await response.json();
			budgets = data.budgets;
		} catch (err) {
			error = (err as Error).message;
		}
	});
</script>

// src/routes/+page.svelte
<main>
	<h1>YNAB Dashboard</h1>
	{#if error}
		<p class="error">{error}</p>
	{:else if budgets.length === 0}
		<p>Loading budgets...</p>
	{:else}
		<ul>
			{#each budgets as budget}
				<li>{budget.name} - {budget.last_modified_on}</li>
			{/each}
		</ul>
	{/if}
</main>

<style>
	.error {
		color: red;
	}
</style>
