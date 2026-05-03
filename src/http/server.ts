import http from 'node:http';
import type { Handler } from '../types/handler.js';

export class Server {
  private httpServer;
  private routes: Map<string, Handler> = new Map();

  constructor() {
    this.httpServer = http.createServer((req, res) => {
      this.handleRequest(req, res);
    });
  }

  async listen(port: number) {
    this.httpServer.listen({
      port,
    });
  }

  async get(path: string, callback: Handler) {
    this.routes.set(path, callback);
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      const requestedRoute = req.url;

      if (!requestedRoute) throw new Error();

      const registeredHandler = this.routes.get(requestedRoute);

      if (!registeredHandler) throw new Error();

      const result = registeredHandler();

      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(result));
    } catch {
      res.statusCode = 404;
      res.end();
      return;
    }
  }
}
