import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { componentTagger } from "lovable-tagger";
import fs from 'fs'; // Node.js file system module
import type { IncomingMessage, ServerResponse } from 'http'; // Import http types

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to remove duplicates from an array
const ensureUnique = (arr: string[]) => [...new Set(arr)];

// Plugin to handle gallery order API
function galleryApiPlugin() {
  return {
    name: 'gallery-api-plugin',
    configureServer(server: ViteDevServer) {
      // Endpoint to GET the current gallery order
      server.middlewares.use('/api/get-gallery-order', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.method === 'GET') {
          const filePath = path.resolve(__dirname, 'public/galleryOrder.json');
          try {
            if (fs.existsSync(filePath)) {
              const fileContent = fs.readFileSync(filePath, 'utf-8');
              const images = JSON.parse(fileContent);
              if (Array.isArray(images)) {
                const uniqueImages = ensureUnique(images);
                if (uniqueImages.length > 0) {
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(uniqueImages));
                  return;
                }
              }
            }
            res.writeHead(200, { 'Content-Type': 'application/json' }); 
            res.end(JSON.stringify([])); 
          } catch (error) {
            console.error('Error reading galleryOrder.json:', error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ message: 'Error reading gallery order file' }));
          }
        } else {
          next();
        }
      });

      // Endpoint to SAVE the gallery order
      server.middlewares.use('/api/save-gallery-order', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer | string) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const images = JSON.parse(body);
              if (Array.isArray(images)) {
                const uniqueImagesToSave = ensureUnique(images);
                const filePath = path.resolve(__dirname, 'public/galleryOrder.json');
                fs.writeFileSync(filePath, JSON.stringify(uniqueImagesToSave, null, 2));
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Order saved successfully' }));
              } else {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Invalid data format: Array expected.' }));
              }
            } catch (error) {
              console.error('Error saving gallery order:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Error saving order' }));
            }
          });
        } else {
          next();
        }
      });
      
      // Endpoint to RENAME a gallery image (file rename + update paths in gallery order)
      server.middlewares.use('/api/rename-gallery-image', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: Buffer | string) => {
            body += chunk.toString();
          });
          req.on('end', () => {
            try {
              const { oldPath, newPath } = JSON.parse(body);
              
              if (!oldPath || !newPath) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Both oldPath and newPath are required' }));
                return;
              }

              // Get absolute paths for the files
              const publicDir = path.resolve(__dirname, 'public');
              // Remove the leading / if present
              const oldRelativePath = oldPath.startsWith('/') ? oldPath.slice(1) : oldPath;
              const newRelativePath = newPath.startsWith('/') ? newPath.slice(1) : newPath;
              
              const oldFilePath = path.join(publicDir, oldRelativePath);
              const newFilePath = path.join(publicDir, newRelativePath);
              
              // Check if source file exists
              if (!fs.existsSync(oldFilePath)) {
                res.writeHead(404, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ message: 'Source file not found' }));
                return;
              }
              
              // Create directory structure for the new path if it doesn't exist
              const newDirPath = path.dirname(newFilePath);
              if (!fs.existsSync(newDirPath)) {
                fs.mkdirSync(newDirPath, { recursive: true });
              }
              
              // Rename the file on the filesystem
              fs.renameSync(oldFilePath, newFilePath);
              
              // Update gallery order JSON with new path
              const galleryOrderPath = path.resolve(__dirname, 'public/galleryOrder.json');
              if (fs.existsSync(galleryOrderPath)) {
                const galleryOrderContent = fs.readFileSync(galleryOrderPath, 'utf-8');
                const galleryOrder = JSON.parse(galleryOrderContent);
                
                if (Array.isArray(galleryOrder)) {
                  // Replace old path with new path in the gallery order
                  const updatedOrder = galleryOrder.map(imgPath => 
                    imgPath === oldPath ? newPath : imgPath
                  );
                  
                  // Save updated gallery order
                  fs.writeFileSync(galleryOrderPath, JSON.stringify(updatedOrder, null, 2));
                }
              }
              
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ 
                message: 'Image renamed successfully',
                oldPath,
                newPath
              }));
              
            } catch (error) {
              console.error('Error renaming gallery image:', error);
              res.writeHead(500, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ message: 'Error renaming image', error: String(error) }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: true,
    port: 8080,
    strictPort: true,
  },
  plugins: [
    react(),
    galleryApiPlugin(), 
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
