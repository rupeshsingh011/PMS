# Database (MongoDB)

PMS uses **MongoDB** via **Mongoose** (`backend/src/config/db.js`).

## Collections

### `users` (`backend/src/models/User.js`)
| Field | Type | Notes |
| --- | --- | --- |
| `username` | `String` | Required, unique, trimmed |
| `password` | `String` | Required, hashed via `bcryptjs` pre-save hook |
| `role` | `String` | `'admin' \| 'client'`, default `'client'` |
| `createdAt` | `Date` | Auto-managed by Mongoose `timestamps` |
| `updatedAt` | `Date` | Auto-managed by Mongoose `timestamps` |
