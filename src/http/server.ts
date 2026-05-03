import http from 'node:http';
import type { Handler } from '../types/handler.js';
import type { HttpMethod, Route } from '../types/route.js';

export class Server {
  private httpServer;
  private routes: Record<HttpMethod, Route[]> = {
    GET: [],
    POST: [],
    PUT: [],
    PATCH: [],
    DELETE: [],
  };

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
    this.addRoute('GET', path, callback);
  }

  private handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
    try {
      const route = this.findRoute(req);

      if (!route) {
        res.statusCode = 404;
        res.end();
        return;
      }

      const result = route.handler();
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(result));
    } catch {
      res.statusCode = 500;
      res.end();
    }
  }

  private addRoute(method: HttpMethod, path: string, handler: Handler) {
    this.routes[method].push({
      method,
      path,
      handler,
    });
  }

  private findRoute(req: http.IncomingMessage) {
    if (!req.method || !this.isHttpMethod(req.method) || !req.url) {
      return;
    }

    return this.routes[req.method].find((route) => route.path === req.url);
  }

  private isHttpMethod(method: string): method is HttpMethod {
    return method in this.routes;
  }
}
