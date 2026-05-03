import type { Server } from '../http/server.js';
import type { Handler } from '../types/handler.js';

export class PumpaApp {
  constructor(private readonly server: Server) {}
  async listen(port: number) {
    return this.server.listen(port);
  }

  async get(path: string, callback: Handler) {
    this.server.get(path, callback);
    return this;
  }
}
