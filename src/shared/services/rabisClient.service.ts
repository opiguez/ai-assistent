import { ENV } from '../../config/base.js';
import { createClient } from '../../generated/client/index.js';

const ENDPOINT = ENV.GRAPHQL_ADRESS || 'http://localhost:81/graphql';
const LOGIN = ENV.PLATFORM_USERNAME || 'admin';
const PASSWORD = ENV.PLATFORM_PASSWORD || 'admin';

const authBuffer = Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

export const rabisClient = createClient({
  url: ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${authBuffer}`,
  },
});
