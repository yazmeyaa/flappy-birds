import { defineConfig } from "vite";
import { resolve } from "path";

const root = resolve(__dirname, "src");

export default defineConfig({
  resolve: {
    alias: {
      "@/src": resolve(root),
      "@/engine": resolve(root, "game", "engine"),
      "@/entities": resolve(root, "game", "entities"),
      "@/components": resolve(root, "game", "components"),
      "@/systems": resolve(root, "game", "systems"),
      "@/assets": resolve(root, "game", "assets"),
    },
  },
});
