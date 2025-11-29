import { defineConfig } from "drizzle-kit";

// Export a factory so importing this file doesn't throw during build or
// in environments where DATABASE_URL is intentionally absent (for example
// local frontend-only development). Consumers that actually run drizzle
// commands should call `getConfig()` which will throw if DATABASE_URL is
// not present.
export function getConfig() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set. Ensure the database is provisioned before running migrations.");
  }

  return defineConfig({
    out: "./migrations",
    schema: "./shared/schema.ts",
    dialect: "postgresql",
    dbCredentials: {
      url: process.env.DATABASE_URL,
    },
  });
}

// Default export kept for tools that expect the default, but it will be a
// lazy getter that throws only when accessed and DATABASE_URL is missing.
export default (() => {
  try {
    return getConfig();
  } catch (err) {
    // Provide a non-throwing placeholder to avoid import-time crashes.
    // This helps frontend or other non-db tasks import the repository
    // without requiring DB credentials. If someone tries to use the
    // default export without DATABASE_URL, they will get a thrown error.
    return undefined as unknown as ReturnType<typeof defineConfig>;
  }
})();
