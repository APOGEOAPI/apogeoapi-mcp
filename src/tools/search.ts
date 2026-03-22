import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiGet } from '../lib/api-client.js';

export function registerSearchTools(server: McpServer) {
  server.tool(
    'global_search',
    'Search across countries, states, and cities in a single query. Returns the best matches from all geographic entity types.',
    {
      q: z.string().min(1).describe('Search term (e.g. "Buenos Aires", "Pampas", "Cordoba")'),
      limit: z.number().int().min(1).max(20).optional().describe('Max results (default: 10)'),
    },
    async ({ q, limit }) => {
      const params = new URLSearchParams({ q });
      if (limit) params.set('limit', String(limit));
      const data = await apiGet(`/v1/api/geo/search?${params}`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );
}
