import createError from 'http-errors';

export const authorizeRole = (role) => ({
    before : (handler) => {
        if(handler.event.user.role !== role) {
            throw createError(403, 'Forbidden: User unauthorized to perform this action');
        }
    }
})