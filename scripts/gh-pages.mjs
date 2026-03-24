import { copyFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"

const root = join(dirname(fileURLToPath(import.meta.url)), "..")
copyFileSync(join(root, "dist", "index.html"), join(root, "dist", "404.html"))
console.log("Copied dist/index.html → dist/404.html (GitHub Pages SPA fallback)")
