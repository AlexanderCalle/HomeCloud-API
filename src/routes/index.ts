import * as Router from '@koa/router';
import * as Koa from 'koa';

/**
 * Install all routes in the given Koa application.
 *
 * @param {Koa} app - The Koa application.
 */
export default (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  const router = new Router({
    prefix: '/api',
  });
  
  app.use(router.routes()).use(router.allowedMethods());
};