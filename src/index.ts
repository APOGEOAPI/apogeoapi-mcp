#!/usr/bin/env node
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { registerCountryTools } from './tools/countries.js';
import { registerStateTools } from './tools/states.js';
import { registerCityTools } from './tools/cities.js';
import { registerCurrencyTools } from './tools/currency.js';
import { registerIpTools } from './tools/ip.js';
import { registerSearchTools } from './tools/search.js';

const server = new McpServer({
  name: 'apogeoapi',
  version: '1.0.0',
});

registerCountryTools(server);
registerStateTools(server);
registerCityTools(server);
registerCurrencyTools(server);
registerIpTools(server);
registerSearchTools(server);

const transport = new StdioServerTransport();
await server.connect(transport);
