import { describe, it, expect, vi } from 'vitest';
import type { Mock } from 'vitest';
import { GET } from './+server';

globalThis.fetch = vi.fn(() =>
	Promise.resolve({
		ok: true,
		json: () => Promise.resolve({ data: { budgets: [] } })
	})
) as unknown as typeof fetch;

describe('GET', () => {
	it('should return a 200 response with data', async () => {
		const response = await GET();
		const json = await response.json();
		expect(response.status).toBe(200);
		expect(json).toEqual({ budgets: [] });
	});

	it('should return a 500 response on error', async () => {
		(globalThis.fetch as Mock).mockImplementationOnce(() =>
			Promise.resolve({
				ok: false,
				json: () => Promise.resolve({ error: 'Failed to fetch YNAB budgets' })
			})
		);
		const response = await GET();
		const json = await response.json();
		expect(response.status).toBe(500);
		expect(json).toHaveProperty('error', 'Failed to fetch YNAB budgets');
	});
});
