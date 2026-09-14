import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

// ── Sync Phase 1 & Phase 2 assets into public/ ─────────────────────────────────────────
function syncDir(srcName, targets) {
  const srcDir = path.resolve(process.cwd(), srcName);
  if (fs.existsSync(srcDir)) {
    targets.forEach(tgt => {
      const tgtDir = path.resolve(process.cwd(), 'public', tgt);
      fs.mkdirSync(tgtDir, { recursive: true });
      for (const file of fs.readdirSync(srcDir)) {
        const srcFile = path.join(srcDir, file);
        if (fs.statSync(srcFile).isFile()) {
          const sanitized = file.replace(/\s+/g, '_');
          fs.copyFileSync(srcFile, path.join(tgtDir, file));
          fs.copyFileSync(srcFile, path.join(tgtDir, sanitized));
        }
      }
    });
  }
}
syncDir('Phase 1', ['Phase 1', 'Phase_1']);
syncDir('Phase 2', ['Phase 2', 'Phase_2']);

// ── Vite plugin: serve video files with proper HTTP Range (206) support ───────
function videoRangePlugin() {
  const publicBase = path.resolve(process.cwd(), 'public');

  return {
    name: 'video-range',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        // Only handle .mp4 / .webm / .ogg requests
        if (!/\.(mp4|webm|ogg)$/i.test(req.url)) return next();

        // Decode URL and strip query string
        const decoded = decodeURIComponent(req.url.split('?')[0]);
        const filePath = path.join(publicBase, decoded);

        if (!fs.existsSync(filePath)) return next();

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const rangeHeader = req.headers['range'];

        if (rangeHeader) {
          // Parse Range: bytes=start-end (end is optional)
          const match = rangeHeader.match(/bytes=(\d+)-(\d*)/);
          if (!match) return next();

          const start = parseInt(match[1], 10);
          // If no end byte specified, serve up to 1MB chunk (or to end of file)
          const end = (match[2] !== undefined && match[2] !== '')
            ? parseInt(match[2], 10)
            : Math.min(start + 1024 * 1024 - 1, fileSize - 1);

          // Validate range
          if (start >= fileSize || end >= fileSize || start > end) {
            res.writeHead(416, {
              'Content-Range': `bytes */${fileSize}`,
              'Content-Type': 'video/mp4',
            });
            res.end();
            return;
          }

          const chunkSize = end - start + 1;
          res.writeHead(206, {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunkSize,
            'Content-Type': 'video/mp4',
          });
          fs.createReadStream(filePath, { start, end }).pipe(res);
        } else {
          res.writeHead(200, {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
            'Accept-Ranges': 'bytes',
          });
          fs.createReadStream(filePath).pipe(res);
        }
      });
    },
  };
}

export default defineConfig({
  publicDir: 'public',
  plugins: [videoRangePlugin()],
  server: {
    port: 3000,
    open: true,
    warmup: {
      clientFiles: ['./src/main.js', './src/style.css'],
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 600,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) {
            return 'gsap';
          }
        },
      },
    },
  },
});
