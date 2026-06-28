import { createClient } from '../../generated/client/index';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.dev' });

const ENDPOINT = process.env.GRAPHQL_URL || 'http://localhost:8080/graphql';
const LOGIN = process.env.PLATFORM_USERNAME || 'admin';
const PASSWORD = process.env.PLATFORM_PASSWORD || 'admin';

const authBuffer = Buffer.from(`${LOGIN}:${PASSWORD}`).toString('base64');

export const rabisClient = createClient({
  url: ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Basic ${authBuffer}`,
  },
});
