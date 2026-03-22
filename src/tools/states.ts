import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiGet } from '../lib/api-client.js';

export function registerStateTools(server: McpServer) {
  server.tool(
    'get_states',
    'Get all states/provinces for a country. Requires Starter plan or above.',
    {
      country_code: z.string().min(2).max(3).describe('ISO2 or ISO3 country code'),
      page: z.number().int().positive().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      fields: z.enum(['basic', 'standard', 'full']).optional(),
    },
    async ({ country_code, page, limit, fields }) => {
      const params = new URLSearchParams();
      if (page) params.set('page', String(page));
      if (limit) params.set('limit', String(limit));
      if (fields) params.set('fields', fields);
      const qs = params.toString() ? `?${params}` : '';
      const data = await apiGet(`/v1/api/geo/countries/${country_code.toUpperCase()}/states${qs}`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );
}
