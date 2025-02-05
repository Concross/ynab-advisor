import { YNAB_ACCESS_TOKEN } from '$env/static/private';

interface Budget {
	id: string;
	name: string;
	total_amount: number;
	// Add other properties as needed
}

interface YNABResponse {
	data: {
		budget: Budget;
	};
}

export async function GET({ params }: { params: { id: string } }): Promise<Response> {
	const { id } = params;
	try {
		const response: Response = await fetch(`https://api.youneedabudget.com/v1/budgets/${id}`, {
			headers: { Authorization: `Bearer ${YNAB_ACCESS_TOKEN}` }
		});
		if (!response.ok) throw new Error('Failed to fetch budget details');
		const data: YNABResponse = await response.json();
		return new Response(JSON.stringify(data.data.budget), { status: 200 });
	} catch (err: Error | unknown) {
		if (err instanceof Error) {
			return new Response(JSON.stringify({ error: err.message }), { status: 500 });
		} else {
			return new Response(JSON.stringify({ error: 'Unknown error' }), { status: 500 });
		}
	}
}
