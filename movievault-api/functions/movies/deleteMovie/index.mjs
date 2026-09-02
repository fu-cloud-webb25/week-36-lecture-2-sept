import middy from '@middy/core';
import { authenticateUser } from '../../../middlewares/authenticate.mjs';
import { authorizeRole } from '../../../middlewares/authorize.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { sendResponse } from "../../../responses/index.mjs";
import { movies } from '../../../data/movies.mjs';

export const handler = middy(async (event) => {
  const { id } = event.pathParameters;
  const index = movies.findIndex(m => m.id === id);
  if(index !== -1) {
    const deleted = movies.splice(index, 1);
    return sendResponse(200, {
      success : true,
      message : `Movie with id ${id} deleted successfully`,
      deleted,
      movies
    });
  } else {
    return sendResponse(404, {
      success : false,
      message : `Movie with id ${id} not found`
    });
  }
}).use(authenticateUser())
  .use(authorizeRole('admin'))
  .use(errorHandler());
