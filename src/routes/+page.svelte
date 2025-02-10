<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { BudgetSummary } from '$lib/ynabTypes';

	let budgets: BudgetSummary[] = [];
	let error: string | null = null;

	onMount(async () => {
		try {
			const response = await fetch('/api/ynab/budgets');
			if (!response.ok) throw new Error('Failed to fetch budgets');
			const data: { budgets: BudgetSummary[] } = await response.json();
			budgets = data.budgets;
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
	<h1>YNAB Dashboard</h1>
	{#if error}
		<p class="error">{error}</p>
	{:else if budgets.length === 0}
		<p class="loading">Loading budgets...</p>
	{:else}
		<div class="budget-container">
			{#each budgets as budget}
				<button
					type="button"
					class="budget-card"
					on:click={() => goto(`/budget/${budget.id}`)}
					on:keydown={(e) => e.key === 'Enter' && goto(`/budget/${budget.id}`)}
					aria-label={`View budget ${budget.name}`}
				>
					<h2>{budget.name}</h2>
					<p>
						<strong>Last Modified:</strong>
						{new Date(budget.last_modified_on).toLocaleDateString()}
					</p>
				</button>
			{/each}
		</div>
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
	h1 {
		color: #2a4d69;
		margin-bottom: 20px;
	}
	.error {
		color: red;
		font-weight: bold;
	}
	.loading {
		font-size: 18px;
		color: #666;
	}
	.budget-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
		gap: 15px;
		margin-top: 20px;
	}
	.budget-card {
		background: #f8f9fa;
		border-radius: 8px;
		padding: 15px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		transition: transform 0.2s ease-in-out;
		cursor: pointer;
	}
	.budget-card:hover {
		transform: translateY(-3px);
	}
	.budget-card h2 {
		color: #4a90e2;
		font-size: 20px;
		margin-bottom: 10px;
	}
</style>
