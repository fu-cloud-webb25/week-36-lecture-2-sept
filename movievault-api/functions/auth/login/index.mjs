import middy from '@middy/core';
import httpJsonBodyParser from '@middy/http-json-body-parser';
import { sendResponse } from "../../../responses/index.mjs";
import { validateBody } from '../../../middlewares/validateBody.mjs';
import { errorHandler } from '../../../middlewares/errorHandler.mjs';
import { loginSchema } from '../../../models/userSchema.mjs';
import { users } from '../../../data/users.mjs';
import { signToken } from '../../../utils/token.mjs';

export const handler = middy(async (event) => {
  const body = event.body;
  const user = users.find(u => u.username === body.username);

  if(user) {
    if(user.password === body.password) {
      return sendResponse(200, {
        success : true,
        message : 'User logged in successfully!',
        token : signToken({ username : user.username, role : user.role })
      });
    } else {
      return sendResponse(400, {
        success : false,
        message : 'Username and/or password are incorrect'
      });
    }
  } else {
    return sendResponse(400, {
      success : false,
      message : 'Username and/or password are incorrect'
    });
  }
}).use(httpJsonBodyParser())
  .use(validateBody(loginSchema))
  .use(errorHandler());
