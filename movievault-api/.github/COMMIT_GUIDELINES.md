# Commit Message Guidelines

We follow **Conventional Commits** for clear and consistent version history.

## Format

```
<type>: <description>
```

## Types

| Type         | Purpose                                     | Example                               |
| ------------ | ------------------------------------------- | ------------------------------------- |
| **feat**     | Add a new feature or API endpoint           | `feat: add getFavorites endpoint`     |
| **fix**      | Fix a bug or issue                          | `fix: handle missing movie ID error`  |
| **refactor** | Improve code without changing functionality | `refactor: simplify response handler` |
| **docs**     | Update documentation or README              | `docs: update API endpoint list`      |

## Rules

- ✅ **Use English** – All messages in English
- ✅ **Use lowercase** – Start description with lowercase
- ✅ **Be concise** – Keep under 50 characters
- ✅ **Imperative mood** – Use "add" not "added" or "adds"
- ✅ **No periods** – Don't end with a period

## Examples

### Good ✅

```
feat: add deleteMovie endpoint
fix: resolve undefined response in addFavorite
refactor: extract response handler to separate module
docs: add authentication section to README
```

### Avoid ❌

```
Updated the movie API
Fix bug
WIP: working on favorites
new feature added
```

## Extended Format (Optional)

For complex changes, add a body after a blank line:

```
feat: add movie rating system

Added 5-star rating functionality to movie endpoints.
Includes validation for ratings between 1-5.
```

---

**Need help?** Refer to this guide before each commit to keep our history clean and readable.
