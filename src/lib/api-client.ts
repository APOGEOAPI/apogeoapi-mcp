const BASE = process.env.APOGEOAPI_BASE_URL ?? 'https://api.apogeoapi.com';

function getKey(): string {
  const key = process.env.APOGEOAPI_KEY;
  if (!key) throw new Error('APOGEOAPI_KEY environment variable is required');
  return key;
}

export async function apiGet(path: string): Promise<unknown> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'X-API-Key': getKey() },
  });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`ApogeoAPI ${res.status}: ${body || res.statusText}`);
  }
  return res.json();
}
