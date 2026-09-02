import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeRole } from '../../../middlewares/authorize.mjs';
import { validateBody } from '../../../middlewares/validateBody.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { favoriteSchema } from '../../../models/favoriteSchema.mjs';
import { sendResponse } from '../../../responses/index.mjs';
import { favorites } from '../../../data/favorites.mjs';
import { movies } from '../../../data/movies.mjs';

export const handler = middy(async (event) => {
  const { movieId } = event.body;
  const isMovieValid = movies.some(movie => movie.id === movieId);

  if (!isMovieValid) {
    return sendResponse(404, {
      success : false,
      message : `Movie with id ${movieId} not found`
    });
  }

  const alreadyFavorited = favorites.some(
    favorite => favorite.username === event.user.username && favorite.movieId === movieId
  );

  if (alreadyFavorited) {
    return sendResponse(409, {
      success : false,
      message : 'Movie is already in your favorites'
    });
  }

  const favorite = {
    username: event.user.username,
    movieId
  };

  favorites.push(favorite);

  return sendResponse(201, {
    success : true,
    message : 'Movie added to favorites',
    favorite,
    favorites
  });
}).use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeRole('user'))
  .use(validateBody(favoriteSchema))
  .use(errorHandler());
