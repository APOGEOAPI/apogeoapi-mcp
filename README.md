# @apogeoapi/mcp

MCP (Model Context Protocol) server for [ApogeoAPI](https://app.apogeoapi.com) — geographic data, live exchange rates, and IP geolocation for Claude Desktop, Cursor, and any MCP-compatible AI assistant.

## What it does

This server exposes ApogeoAPI's REST endpoints as tools that AI assistants can call directly. Ask Claude "What is the current USD rate for Argentina?" or "Geolocate IP 8.8.8.8" and it will call the right tool automatically.

## Available tools

| Tool | Description | Plan required |
|------|-------------|---------------|
| `get_country` | Full country data by ISO2/ISO3 code — name, capital, region, population, currency, live USD rate, timezones, phone code | Free |
| `list_countries` | Paginated list of all 250+ countries | Free |
| `search_countries` | Search countries by partial name | Free |
| `get_states` | All states/provinces for a country | Basic+ |
| `get_cities` | All cities for a state by numeric state ID | Basic+ |
| `get_currency_rate` | Live USD exchange rate for a country's currency (updated every 4 hours) | Basic+ |
| `geolocate_ip` | Country, region, city, coordinates, timezone, and EU membership for any IPv4/IPv6 | Basic+ |
| `global_search` | Search across countries, states, and cities in one query | Free |

## Installation

### Claude Desktop

Add the following to your `claude_desktop_config.json`:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "apogeoapi": {
      "command": "npx",
      "args": ["-y", "@apogeoapi/mcp"],
      "env": {
        "APOGEOAPI_KEY": "apogeoapi_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

Restart Claude Desktop after saving the file. The ApogeoAPI tools will appear in Claude's tool list.

### Cursor

Add the same block under `mcpServers` in Cursor's MCP configuration file (`~/.cursor/mcp.json`).

### Manual build

```bash
git clone https://github.com/APOGEOAPI/apogeoapi-mcp.git
cd apogeoapi-mcp
npm install
npm run build
```

Then reference the built file directly:

```json
{
  "mcpServers": {
    "apogeoapi": {
      "command": "node",
      "args": ["/absolute/path/to/mcp-server/dist/index.js"],
      "env": {
        "APOGEOAPI_KEY": "apogeoapi_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      }
    }
  }
}
```

## Getting an API key

1. Create a free account at [app.apogeoapi.com](https://app.apogeoapi.com)
2. Go to **API Keys** and generate a new key
3. Paste the key into the `APOGEOAPI_KEY` environment variable above

No credit card required for the Free plan (1,000 req/month).

## Plan requirements

| Feature | Free | Basic ($19/mo) | Starter ($29/mo) | Professional ($79/mo) |
|---------|------|----------------|-------------------|-----------------------|
| Countries (list, search, get) | Yes | Yes | Yes | Yes |
| Global search | Yes | Yes | Yes | Yes |
| States & cities | No | Yes | Yes | Yes |
| Live currency rates | No | Yes | Yes | Yes |
| IP geolocation | No | Yes | Yes | Yes |
| Monthly requests | 1,000 | 15,000 | 100,000 | 500,000 |

Upgrade at [app.apogeoapi.com/dashboard/billing](https://app.apogeoapi.com/dashboard/billing).

## Environment variables

| Variable | Required | Description |
|----------|----------|-------------|
| `APOGEOAPI_KEY` | Yes | Your API key from the dashboard |
| `APOGEOAPI_BASE_URL` | No | Override the API base URL (default: `https://api.apogeoapi.com`) |

## License

MIT
