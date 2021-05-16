import express from 'express';
import { 
  authenticateCallbackHandler,
  authenticateUser
 } from '../controllers';

export class Routes {

  public routes(app: express.Application): void {
    this.createRoutes(app);
  }

  createRoutes(app: express.Application) {
    app.get('/', authenticateUser);
    app.get('/login', authenticateUser);
    app.get('/callback', authenticateCallbackHandler);
  }
}
