import express, { type Express } from "express";
import fs from "fs";
import path from "path";

export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");
  if (!fs.existsSync(distPath)) {
    // Don't throw during server startup; in many development workflows the
    // client may be served by Vite instead of a built directory. Log a
    // helpful warning and skip static serving.
    // eslint-disable-next-line no-console
    console.warn(`serveStatic: build directory not found at ${distPath}, skipping static serve`);
    return;
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
