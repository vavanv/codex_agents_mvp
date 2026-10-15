# Task Management API

Run commands from this directory:

```powershell
npm run typecheck
npm test
npm run build
npm start
```

The API listens on port 3000 (override with `PORT`). Data is held in memory
and disappears when the process restarts.

| Endpoint | Success | Behavior |
| --- | --- | --- |
| POST /tasks | 201 | Create with required title and optional description |
| GET /tasks | 200 | List all tasks |
| GET /tasks/:id | 200 | Read a task |
| PATCH /tasks/:id | 200 | Update title and/or description |
| DELETE /tasks/:id | 204 | Delete a task; empty response |

Titles must be strings containing a non-whitespace character, up to 200
characters. Descriptions must be strings up to 2000 characters; an empty
string clears a description. Omitted fields stay unchanged during updates.
Nulls, wrong types, unknown fields, and empty updates return 400. Unknown
task IDs return 404 for valid read, update, and delete requests.

The Jest suite sends HTTP requests to a real Nest application with the same
validation setup as the production bootstrap. Each test uses fresh storage.
