import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeRole } from '../../../middlewares/authorize.mjs';
import { validateBody } from '../../../middlewares/validateBody.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { movieUpdateSchema } from '../../../models/movieSchema.mjs';
import { sendResponse } from "../../../responses/index.mjs";
import { movies } from '../../../data/movies.mjs';

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;
  const movieIndex = movies.findIndex(movie => movie.id === id);

  if (movieIndex === -1) {
    return sendResponse(404, {
      success : false,
      message : `Movie with id ${id} not found`
    });
  }

  const updatedMovie = {
    ...movies[movieIndex],
    ...event.body
  };

  movies[movieIndex] = updatedMovie;

  return sendResponse(200, {
    success : true,
    message : `Movie with id ${id} updated successfully`,
    movie : updatedMovie,
    movies
  });
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeRole('admin'))
  .use(validateBody(movieUpdateSchema))
  .use(errorHandler());
