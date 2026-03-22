import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiGet } from '../lib/api-client.js';

export function registerCountryTools(server: McpServer) {
  server.tool(
    'get_country',
    'Get full data for a country by ISO2 or ISO3 code — includes name, capital, region, population, currency, live USD exchange rate, timezones, and phone code.',
    {
      code: z.string().min(2).max(3).describe('ISO2 (e.g. AR) or ISO3 (e.g. ARG) country code'),
      fields: z.enum(['basic', 'standard', 'full']).optional().describe('Detail level: basic (fast), standard (default), full (all fields)'),
    },
    async ({ code, fields }) => {
      const qs = fields ? `?fields=${fields}` : '';
      const data = await apiGet(`/v1/api/geo/countries/${code.toUpperCase()}${qs}`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.tool(
    'list_countries',
    'List all countries with pagination. Returns basic info by default — add fields=full for all data.',
    {
      page: z.number().int().positive().optional().describe('Page number (default: 1)'),
      limit: z.number().int().min(1).max(100).optional().describe('Results per page (default: 50, max: 100)'),
      fields: z.enum(['basic', 'standard', 'full']).optional().describe('Detail level'),
    },
    async ({ page, limit, fields }) => {
      const params = new URLSearchParams();
      if (page) params.set('page', String(page));
      if (limit) params.set('limit', String(limit));
      if (fields) params.set('fields', fields);
      const qs = params.toString() ? `?${params}` : '';
      const data = await apiGet(`/v1/api/geo/countries${qs}`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );

  server.tool(
    'search_countries',
    'Search countries by name (e.g. "arg" finds Argentina). Returns paginated matches.',
    {
      q: z.string().min(1).describe('Search query (partial name match)'),
      page: z.number().int().positive().optional(),
      limit: z.number().int().min(1).max(100).optional(),
    },
    async ({ q, page, limit }) => {
      const params = new URLSearchParams({ q });
      if (page) params.set('page', String(page));
      if (limit) params.set('limit', String(limit));
      const data = await apiGet(`/v1/api/geo/countries/search?${params}`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );
}
