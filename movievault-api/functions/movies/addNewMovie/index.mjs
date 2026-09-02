import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeRole } from '../../../middlewares/authorize.mjs';
import { validateBody } from '../../../middlewares/validateBody.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { movieSchema } from '../../../models/movieSchema.mjs';
import { sendResponse } from "../../../responses/index.mjs";
import { movies } from '../../../data/movies.mjs';

export const handler = middy(async (event) => {
  const movie = {
    id : `tt${crypto.randomUUID().slice(0, 7)}`,
    ...event.body
  }
  movies.push(movie);

  return sendResponse(201, {
    success : true,
    message : 'New movie created successfully',
    movie, 
    movies
  });
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeRole('admin'))
  .use(validateBody(movieSchema))
  .use(errorHandler());
