import createError from 'http-errors';
import { loginSchema } from '../models/userSchema.mjs';

export const validateUser = () => ({
    before : (handler) => {
        const result = loginSchema.safeParse(handler.event.body);
        if(!result.success) {
            throw createError(400, result.error.issues[0].message);
        }
        handler.event.body = result.data;
    }
})