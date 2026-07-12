import { ENV } from '../../config/base.js';
import { createClient } from '../../generated/client/index.js';

export const ENDPOINT = ENV.GRAPHQL_ADRESS || 'http://localhost:81/graphql';
export const LOGIN = ENV.PLATFORM_USERNAME || 'admin';
export const PASSWORD = ENV.PLATFORM_PASSWORD || 'admin';

export const authBuffer = Buffer.from(`${LOGIN}:${PASSWORD}`).toString(
  'base64',
);

export const rabisClient = createClient({
  url: ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${authBuffer}`,
  },
});
