<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/state';
	import type { BudgetSummary } from '$lib/ynabTypes';
	import { type Writable, writable } from 'svelte/store';
	import { PieChart } from 'layerchart';

	let budget: BudgetSummary | null = null;
	let error: string | null = null;
	let totalFunds = 0;
	let assignedFunds = 0;
	let unassignedFunds = 0;
	let chartData: Writable<{ label: string; value: number; color: string }[]> = writable([]);

	onMount(async () => {
		const budgetId = page.params.id as string;
		try {
			const response = await fetch(`/api/ynab/budget/${budgetId}`);
			if (!response.ok) throw new Error('Failed to fetch budget details');
			const data: BudgetSummary = await response.json();
			budget = data;

			const onBudgetBankAccounts = budget.accounts.filter(
				(account) => account.on_budget && ['checking', 'savings'].includes(account.type)
			);
			totalFunds = parseFloat(
				(
					onBudgetBankAccounts.reduce((total, account) => total + account.balance, 0) / 1000
				).toFixed(2)
			);
			assignedFunds = parseFloat(
				(
					budget.categories.reduce((total, category) => total + category.budgeted, 0) / 1000
				).toFixed(2)
			);
			unassignedFunds = totalFunds - assignedFunds;
			const getRandomColor = () => {
				const letters = '0123456789ABCDEF';
				let color = '#';
				for (let i = 0; i < 6; i++) {
					color += letters[Math.floor(Math.random() * 16)];
				}
				return color;
			};

			const categoryData = budget.categories
				.map((category) => ({
					label: category.name,
					value: category.budgeted / 1000,
					color: getRandomColor()
				}))
				.reduce<{ label: string; value: number; color: string }[]>((acc, category) => {
					if (category.value < 100 && category.value > 0) {
						console.log('category', category);
						const other = acc.find((item) => item.label === 'Other');
						console.log('OTHER', other);
						if (other) {
							other.value += category.value;
						} else {
							acc.push({ label: 'Other', value: category.value, color: getRandomColor() });
						}
					} else {
						acc.push(category);
					}
					return acc;
				}, []);

			chartData.set(categoryData);
		} catch (err) {
			error = (err as Error).message;
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
		<p><strong>Total Funds:</strong> ${totalFunds}</p>
		<p><strong>Assigned Funds:</strong> ${assignedFunds}</p>
		<p>
			<strong>Unassigned Funds:</strong> ${unassignedFunds}
		</p>

		<div class="h-[300px] resize overflow-auto rounded border p-4">
			<PieChart
				data={$chartData}
				key="label"
				value="value"
				c="color"
				cRange={$chartData.map((cd) => cd.color)}
			/>
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
	.error {
		color: red;
		font-weight: bold;
	}
	.loading {
		font-size: 18px;
		color: #666;
	}
</style>
