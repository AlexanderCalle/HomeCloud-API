import * as Koa from 'koa';
import * as bodyParser from 'koa-bodyparser';
import * as config from 'config';
import * as koaCors from 'koa-cors';
import * as emoji from 'node-emoji';

import { getLogger } from './logging';
import { ServiceError } from './serviceError';

const CORS_ORIGINS: string[] = config.get('cors.origins');
const CORS_MAX_AGE: number = config.get('cors.maxAge');
const NODE_ENV: string = config.get('env');


export function installMiddleware(app: Koa) {

  app.use(
    koaCors({
      origin: (ctx: Koa.Request) => {
        if (CORS_ORIGINS.indexOf(ctx.header.origin) !== -1) {
          return ctx.header.origin;
        }
        // Not a valid domain at this point, let's return the first valid as we should return a string
        return CORS_ORIGINS[0];
      },
      headers: ['Accept', 'Content-Type', 'Authorization'],
      maxAge: CORS_MAX_AGE,
    }),
  );

  app.use(async (ctx, next) => {
    getLogger().info(`${emoji.get('fast_forward')} ${ctx.method} ${ctx.url}`);
    const getStatusEmoji = () => {
      if (ctx.status >= 500) return emoji.get('skull');
      if (ctx.status >= 400) return emoji.get('x');
      if (ctx.status >= 300) return emoji.get('rocket');
      if (ctx.status >= 200) return emoji.get('white_check_mark');
      return emoji.get('rewind');
    };

    try {
      await next();

      getLogger().info(
        `${getStatusEmoji()} ${ctx.method} ${ctx.status} ${ctx.url}`,
      );
    } catch (error) {
      getLogger().error(
        `${emoji.get('x')} ${ctx.method} ${ctx.status} ${ctx.url}`,
        {
          error,
        },
      );

      throw error;
    }
  });

  app.use(bodyParser());

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      getLogger().error('Error occured while handling a request', { error });
      let statusCode = error.status || 500;
      const errorBody = {
        code: error.code || 'INTERNAL_SERVER_ERROR',
        message: error.message,
        details: error.details || null,
        stack: NODE_ENV !== 'production' ? error.stack : undefined,
      };

      if (error instanceof ServiceError) {
        if (error.isNotFound) {
          statusCode = 404;
        }

        if (error.isValidationFailed) {
          statusCode = 400;
        }

        if (error.isUnauthorized) {
          statusCode = 401;
        }

        if (error.isForbidden) {
          statusCode = 403;
        }
      }

      ctx.status = statusCode;
      ctx.body = errorBody;
    }
  });

  // Handle 404 not found with uniform response
  app.use(async (ctx, next) => {
    await next();

    if (ctx.status === 404) {
      ctx.status = 404;
      ctx.body = {
        code: 'NOT_FOUND',
        message: `Unknown resource: ${ctx.url}`,
      };
    }
  });
}
