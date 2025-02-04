import { YNAB_ACCESS_TOKEN } from '$env/static/private';

interface YNABResponse {
	data: any; // Replace 'any' with the appropriate type if known
}

export async function GET(): Promise<Response> {
	try {
		const response: Response = await fetch('https://api.youneedabudget.com/v1/budgets', {
			headers: { Authorization: `Bearer ${YNAB_ACCESS_TOKEN}` }
		});
		if (!response.ok) throw new Error('Failed to fetch YNAB budgets');
		const data: YNABResponse = await response.json();
		return new Response(JSON.stringify(data.data), { status: 200 });
	} catch (err: any) {
		return new Response(JSON.stringify({ error: err.message }), { status: 500 });
	}
}
