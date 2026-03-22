import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { apiGet } from '../lib/api-client.js';

export function registerIpTools(server: McpServer) {
  server.tool(
    'geolocate_ip',
    'Geolocate an IPv4 or IPv6 address — returns country, region, city, coordinates, timezone, and EU membership. Requires Starter plan or above.',
    {
      address: z.string().describe('IPv4 or IPv6 address to geolocate (e.g. 8.8.8.8 or 2001:4860:4860::8888)'),
    },
    async ({ address }) => {
      const data = await apiGet(`/v1/api/geo/ip/${address}`);
      return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
    }
  );
}
