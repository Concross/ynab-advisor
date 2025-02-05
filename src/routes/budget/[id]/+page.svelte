<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	interface Budget {
		id: string;
		name: string;
		total_amount: number;
		// Add other properties as needed
	}

	let budget: Budget | null = null;
	let error: string | null = null;

	onMount(async () => {
		const budgetId = $page.params.id;
		console.log(`Fetching budget with ID: ${budgetId}`);
		try {
			const response = await fetch(`/api/ynab/budget/${budgetId}`);
			if (!response.ok) throw new Error('Failed to fetch budget details');
			const data: Budget = await response.json();
			budget = data;
		} catch (err: Error | unknown) {
			if (err instanceof Error) {
				error = err.message;
			} else {
				error = 'Unknown error';
			}
		}
	});
</script>

<main>
	{#if error}
		<p class="error">{error}</p>
	{:else if !budget}
		<p class="loading">Loading budget details...</p>
	{:else}
		<h1>{budget.name}</h1>
		<p><strong>Total Funds:</strong> ${budget.total_amount / 1000}</p>
	{/if}
</main>

<style>
	main {
		font-family: 'Arial', sans-serif;
		max-width: 800px;
		margin: auto;
		padding: 20px;
		text-align: center;
	}
	.error {
		color: red;
		font-weight: bold;
	}
	.loading {
		font-size: 18px;
		color: #666;
	}
</style>
