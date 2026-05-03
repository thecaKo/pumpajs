import { Server } from './http/server.js';
import { PumpaApp } from './pumpa/pumpa-app.js';

export function pumpa() {
  const server = new Server();
  return new PumpaApp(server);
}
