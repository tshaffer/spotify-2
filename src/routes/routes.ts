import express from 'express';
import { 
  authenticateCallbackHandler,
  authenticateUser,
  getIndex,
  getCSS,
  getBundle,
  getBundleMap,
 } from '../controllers';

export class Routes {

  public routes(app: express.Application): void {
    this.createRoutes(app);
  }

  createRoutes(app: express.Application) {
    app.get('/', getIndex);
    app.get('/index.html', getIndex);
    app.get('/css/app.css', getCSS);
    app.get('/build/bundle.js', getBundle);
    app.get('/build/bundle.js.map', getBundleMap);
    // app.get('/', authenticateUser);
    app.get('/login', authenticateUser);
    app.get('/callback', authenticateCallbackHandler);
  }
}
