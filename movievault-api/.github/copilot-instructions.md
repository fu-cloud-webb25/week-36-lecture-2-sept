# Copilot instructions for this project

## Project structure

- Keep the Serverless Framework layout: `functions/<feature>/<action>/index.mjs`.
- Put feature logic under `functions/`, shared logic under `middlewares/`, `models/`, `responses/`, `utils/`, and static mock data under `data/`.
- Use lowercase folder names and camelCase action names that match the Serverless function name.
- Keep each Lambda entry file as `index.mjs` and export `handler`.

## Coding style

- Use ES modules with `.mjs` files.
- Prefer named exports and relative imports like `../../../...` from functions.
- Use camelCase for variables, functions, and properties.
- Keep logic simple and explicit; avoid unnecessary abstractions.
- Follow the existing style of `const name = ...`, arrow functions, and semicolon-terminated statements.

## Lambda pattern

- For HTTP handlers, prefer the project pattern:
    - `export const handler = middy(async (event) => { ... })`
    - then `.use(...)` middleware chain
- Use `sendResponse(statusCode, body)` from `responses/index.mjs` for all successful or failed responses.
- Return objects shaped like `{ success: true/false, message?: string, ...data }` and let `sendResponse` stringify them.

## Middleware and validation

- Reuse the shared middleware instead of duplicating logic:
    - `authenticateUser()` for JWT auth
    - `authorizeRole(role)` for role checks
    - `validateBody(schema)` for request validation
    - `errorHandler()` for consistent error responses
- Use `http-errors` and throw `createError(statusCode, message)` where appropriate.
- Validation belongs in `models/*.mjs` using Zod schemas.

## Authentication and authorization

- Read the JWT from the `Authorization` header, typically in Bearer format.
- Store the decoded token payload on `event.user` and use `event.user.role` for authorization.
- Follow the existing role model: `user` and `admin`.

## Data layer

- Use the in-memory data arrays in `data/*.mjs` as the project’s persistence model.
- For CRUD-style actions, work directly with the arrays using `find`, `filter`, `findIndex`, `push`, and `splice` as already used in the project.

## Avoid

- Do not introduce TypeScript, a new framework, or a different file structure.
- Do not add new response patterns outside `sendResponse`.
- Do not bypass the shared middleware for auth/validation/error handling when the route already follows the project pattern.
- Do not create new persistent storage layers or database wrappers unless the project explicitly changes direction.
