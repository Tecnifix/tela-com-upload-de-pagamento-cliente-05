// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, cloudflare (build-only),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... } }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { nitro } from "nitro/vite";
import { defineConfig as defineViteConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

const isVercelBuild = process.env.VERCEL === "1";

const tanstackStartOptions = {
  importProtection: {
    behavior: "error",
    client: {
      files: ["**/server/**"],
      specifiers: ["server-only"],
    },
  },
  server: { entry: "server" },
} satisfies Parameters<typeof tanstackStart>[0];

const vercelConfig = defineViteConfig({
  resolve: {
    alias: {
      "@": `${process.cwd()}/src`,
    },
  },
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(tanstackStartOptions),
    nitro({ preset: "vercel" }),
    viteReact(),
  ],
});

const isBuild = process.argv.includes("build");

const lovableConfig = defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  vite: {
    ssr: isBuild
      ? {
          // Production Worker build: no runtime module resolver exists, so every
          // npm dependency must be bundled into the server output.
          noExternal: true,
        }
      : {
      // The deployed Worker has no runtime package resolver. Bundle the full
      // TanStack request/router graph and its non-Node runtime dependencies.
      noExternal: [
        /^@tanstack\//,
        "h3-v2",
        "rou3",
        "srvx",
        "crossws",
        "cookie-es",
        "seroval",
        "seroval-plugins",
      ],
        },
  },
});

export default isVercelBuild ? vercelConfig : lovableConfig;
