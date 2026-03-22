import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiGet } from '../lib/api-client.js';

export function registerCityTools(server: McpServer) {
  server.tool(
    'get_cities',
    'Get all cities for a state/province by state ID. Requires Starter plan or above.',
    {
      state_id: z.number().int().positive().describe('Numeric state ID (from get_states response)'),
      page: z.number().int().positive().optional(),
      limit: z.number().int().min(1).max(100).optional(),
      fields: z.enum(['basic', 'standard', 'full']).optional(),
    },
    async ({ state_id, page, limit, fields }) => {
      const params = new URLSearchParams();
      if (page) params.set('page', String(page));
      if (limit) params.set('limit', String(limit));
      if (fields) params.set('fields', fields);
      const qs = params.toString() ? `?${params}` : '';
      const data = await apiGet(`/v1/api/geo/states/${state_id}/cities${qs}`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );
}
