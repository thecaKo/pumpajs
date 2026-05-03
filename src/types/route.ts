import type { Handler } from './handler.js';

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type Route = {
  method: HttpMethod;
  path: string;
  handler: Handler;
};
