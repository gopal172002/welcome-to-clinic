// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { nitro } from "nitro/vite";
import type { Plugin } from "vite";

/** Nitro Vercel output — build only so `npm run dev` stays fast and simple. */
function nitroVercelBuildPlugins(): Plugin[] {
  const created = nitro({ preset: "vercel" });
  const list = Array.isArray(created) ? created : [created];
  return list.map((plugin) => ({ ...plugin, apply: "build" }));
}

// Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
export default defineConfig({
  cloudflare: false,
  tanstackStart: {
    server: { entry: "server" },
  },
  plugins: nitroVercelBuildPlugins(),
});
