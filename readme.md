# Relay Backend — Prisma Setup

This project uses **Prisma 6.19.0** with **PostgreSQL (Neon)**.

The Prisma schema and configuration are located inside the `src/` directory.

---

## 📁 Project Structure

```text
backend/
├── src/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   └── migrations/
│   │       └── <migration>/
│   │           └── migration.sql
│   │
│   └── prisma.config.ts
│
├── .env
├── package.json
└── tsconfig.json
```

---

## ⚙️ Configuration

### `src/prisma.config.ts`

```ts
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  schema: "src/prisma/schema.prisma",

  datasource: {
    url: env("DATABASE_URL"),
  },
});
```

### `.env`

Keep the `.env` file at the project root:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
```

> **Note:** Never commit `.env` to the repository.

---

# 📦 Installation

This project uses Prisma `6.19.0`.

```bash
npm install @prisma/client@6.19.0
npm install -D prisma@6.19.0
```

---

# 🔄 Prisma Development Workflow

Whenever the database schema needs to change, follow this workflow:

```text
┌─────────────────────────┐
│ 1. Update schema.prisma │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 2. Validate schema      │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 3. Create migration     │
│    & apply it           │
└────────────┬────────────┘
             ↓
┌─────────────────────────┐
│ 4. Prisma Client        │
│    generated            │
│    automatically        │
└─────────────────────────┘
```

## 1. Update the Prisma Schema

Make database changes in:

```text
src/prisma/schema.prisma
```

For example:

```prisma
model User {
  id        String   @id @default(cuid())
  username  String   @unique
  email     String   @unique
  createdAt DateTime @default(now())
}
```

---

## 2. Validate the Schema

Before creating a migration:

```bash
npx prisma validate --config=src/prisma.config.ts
```

This checks whether the Prisma schema and configuration are valid.

---

## 3. Create & Apply a Migration

After modifying the schema:

```bash
npx prisma migrate dev --name <migration_name> --config=src/prisma.config.ts
```

Example:

```bash
npx prisma migrate dev --name create_user --config=src/prisma.config.ts
```

This command:

* Creates a migration file.
* Applies the migration to the database.
* Automatically generates Prisma Client.

Migrations are stored in:

```text
src/prisma/migrations/
```

### Example

```text
Modify schema.prisma
        ↓
prisma validate
        ↓
prisma migrate dev
        ↓
Migration created
        ↓
Migration applied to Neon
        ↓
Prisma Client generated
```

> **Important:** The `migrations/` folder should be committed to Git. It contains the database migration history required to set up and update the database in other environments.

---

# 👥 Setting Up the Database After Cloning

The `src/prisma/migrations/` folder is committed to the repository and contains the database migration history.

After cloning the project:

### 1. Install dependencies

```bash
npm install
```

### 2. Create `.env`

Create the `.env` file at the project root:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
```

### 3. Apply existing migrations

```bash
npx prisma migrate deploy --config=src/prisma.config.ts
```

This applies all committed migrations that have not yet been applied to the configured database.

After this, the database schema will be up to date with the migration history in:

```text
src/prisma/migrations/
```

> **Note:** `migrate deploy` does not create new migrations. It only applies existing migrations.

### Clone → Database Setup

```text
Clone repository
      ↓
npm install
      ↓
Create .env
      ↓
prisma migrate deploy
      ↓
Database schema updated
      ↓
Start application
```

---

# 🖥️ Prisma Studio

To inspect the database using Prisma Studio:

```bash
npx prisma studio --config=src/prisma.config.ts
```

---

# 🚀 Production

For staging and production environments, use:

```bash
npx prisma migrate deploy --config=src/prisma.config.ts
```

`migrate deploy` applies existing migrations without creating new ones.

Development migrations should be created using:

```bash
npx prisma migrate dev --name <migration_name> --config=src/prisma.config.ts
```

---

# 🧬 Prisma Client

`prisma migrate dev` automatically generates Prisma Client after successfully applying a migration.

Therefore, after:

```bash
npx prisma migrate dev --name create_user --config=src/prisma.config.ts
```

you normally **do not need to run `prisma generate` separately**.

If you need to manually regenerate Prisma Client:

```bash
npx prisma generate --config=src/prisma.config.ts
```

---

# 🛠️ NPM Scripts

To avoid repeatedly typing the Prisma config path, add these scripts to `package.json`:

```json
{
  "scripts": {
    "prisma:validate": "prisma validate --config=src/prisma.config.ts",
    "prisma:generate": "prisma generate --config=src/prisma.config.ts",
    "db:migrate": "prisma migrate dev --config=src/prisma.config.ts",
    "db:deploy": "prisma migrate deploy --config=src/prisma.config.ts",
    "prisma:studio": "prisma studio --config=src/prisma.config.ts"
  }
}
```

Then use:

### Validate

```bash
npm run prisma:validate
```

### Create & apply migration

```bash
npm run db:migrate -- --name <migration_name>
```

Example:

```bash
npm run db:migrate -- --name add_workspace
```

### Deploy existing migrations

```bash
npm run db:deploy
```

### Open Prisma Studio

```bash
npm run prisma:studio
```

---

# 📋 Command Reference

| Command                 | Purpose                                  |
| ----------------------- | ---------------------------------------- |
| `prisma validate`       | Validate Prisma schema                   |
| `prisma migrate dev`    | Create and apply a development migration |
| `prisma migrate deploy` | Apply existing migrations                |
| `prisma generate`       | Manually generate Prisma Client          |
| `prisma studio`         | Open Prisma Studio                       |

All Prisma commands use the project configuration:

```text
--config=src/prisma.config.ts
```

---

# 📌 Important Notes

* Run Prisma commands from the **project root**.
* Keep `.env` at the project root.
* Never commit `.env`.
* Keep the Prisma schema at `src/prisma/schema.prisma`.
* **Commit `src/prisma/migrations/` to Git.**
* Use `prisma migrate dev` to create and apply migrations during development.
* Use `prisma migrate deploy` to apply existing migrations in staging/production.
* `prisma migrate dev` automatically generates Prisma Client after a successful migration.
* Use `prisma generate` separately only when you need to regenerate the client without running a migration.

---

# 🚀 Quick Start

After cloning the project:

```bash
npm install
```

Create `.env`:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
```

Apply the existing migrations:

```bash
npm run db:deploy
```

Validate the Prisma setup:

```bash
npm run prisma:validate
```

Open Prisma Studio if needed:

```bash
npm run prisma:studio
```

---

# 🔁 TL;DR

### When developing a schema change

```text
1. Modify schema.prisma
        ↓
2. prisma validate
        ↓
3. prisma migrate dev
        ↓
4. Migration created & applied
        ↓
5. Prisma Client generated automatically
```

Commands:

```bash
npm run prisma:validate
npm run db:migrate -- --name <migration_name>
```

### When cloning the repository

```text
1. npm install
        ↓
2. Create .env
        ↓
3. prisma migrate deploy
        ↓
4. Database is up to date
```

Command:

```bash
npm run db:deploy
```

### For production

```bash
npm run db:deploy
```
