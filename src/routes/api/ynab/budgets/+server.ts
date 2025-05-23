import { YNAB_ACCESS_TOKEN } from '$env/static/private';

interface Budget {
	id: string;
	name: string;
	last_modified_on: string;
	// Add other properties as needed
}

interface YNABResponse {
	data: {
		budgets: Budget[];
	};
}

export async function GET(): Promise<Response> {
	try {
		const response: Response = await fetch('https://api.youneedabudget.com/v1/budgets', {
			headers: { Authorization: `Bearer ${YNAB_ACCESS_TOKEN}` }
		});
		if (!response.ok) throw new Error('Failed to fetch YNAB budgets');
		const data: YNABResponse = await response.json();
		return new Response(JSON.stringify(data.data), { status: 200 });
	} catch (err: Error | unknown) {
		if (err instanceof Error) {
			return new Response(JSON.stringify({ error: err.message }), { status: 500 });
		} else {
			return new Response(JSON.stringify({ error: 'Unknown error' }), { status: 500 });
		}
	}
}
