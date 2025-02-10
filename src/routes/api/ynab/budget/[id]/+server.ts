import { YNAB_ACCESS_TOKEN } from '$env/static/private';
import type { SingleBudgetSummaryResponse } from '$lib/ynabTypes';

export async function GET({ params }: { params: { id: string } }): Promise<Response> {
	const { id } = params;
	try {
		const response: Response = await fetch(`https://api.youneedabudget.com/v1/budgets/${id}`, {
			headers: { Authorization: `Bearer ${YNAB_ACCESS_TOKEN}` }
		});
		if (!response.ok) throw new Error('Failed to fetch budget details');
		const data: SingleBudgetSummaryResponse = await response.json();
		return new Response(JSON.stringify(data.data.budget), { status: 200 });
	} catch (err: Error | unknown) {
		if (err instanceof Error) {
			return new Response(JSON.stringify({ error: err.message }), { status: 500 });
		} else {
			return new Response(JSON.stringify({ error: 'Unknown error' }), { status: 500 });
		}
	}
}
