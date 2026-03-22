import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiGet } from '../lib/api-client.js';

export function registerCurrencyTools(server: McpServer) {
  server.tool(
    'get_currency_rate',
    'Get the live USD exchange rate for a country\'s currency. Updated every 4 hours. Requires Starter plan or above.',
    {
      country_code: z.string().min(2).max(3).describe('ISO2 or ISO3 country code (e.g. AR, BR, JP)'),
    },
    async ({ country_code }) => {
      const data = await apiGet(`/v1/api/geo/countries/${country_code.toUpperCase()}/currency-rate`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );
}
