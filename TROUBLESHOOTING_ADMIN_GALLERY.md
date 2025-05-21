# Admin Gallery Arrange – Troubleshooting & Guidelines

> A quick reference compiled after fixing the `/admin/gallery/arrange` page routing issue.

## 1. Routing

### React-Router
1. **Use a wildcard for nested routes**
   ```tsx
   <Route path="/admin/*" element={<Admin />} />
   ```
   • Allows any sub-path under `/admin` (e.g. `/admin/gallery/arrange`).
2. Inside `src/pages/admin/index.tsx` define child routes relatively:
   ```tsx
   <Routes>
     <Route path="gallery/arrange" element={<Arrange />} />
   </Routes>
   ```

### 404 that returns 200
If `curl -I` returns `200 OK` but the browser shows a 404 page, React Router likely rendered its catch-all `NotFound` component. Verify:
* The wildcard route (`*`) is last in the list.
* Parent `<Route>` has `/*` so children match.

## 2. Dev-Server Port Conflicts

* Vite defaults to **port 3000** from `npm run dev`. Use `lsof` to find and kill the old process:
  ```bash
  lsof -i :3000 | grep LISTEN
  kill -9 <pid>
  ```
* Alternatively set a fixed port in `vite.config.ts` (`server.port`).

## 3. Verifying with CLI Tools

* `curl -I <url>` – check HTTP status / headers.
* `curl -s <url> | head` – quick peek at HTML.
* `grep -i "not found"` on the HTML to detect client-side 404s.

## 4. API Stubs in Vite

`vite.config.ts` can expose mock endpoints during development:
```ts
server.middlewares.use('/api/get-gallery-order', (req, res) => { ... })
```
* These run **inside** the dev server process; they disappear in production builds.
* Keep sample data in `public/galleryOrder.json`.

## 5. Package Checklist

Ensure these dependencies exist in `package.json`:
* `react-router-dom`
* `@tanstack/react-query`
* `@hello-pangea/dnd` (for drag-and-drop)

Install with:
```bash
npm install react-router-dom @tanstack/react-query @hello-pangea/dnd
```

## 6. Common Pitfalls

| Problem                                  | Quick Fix |
|------------------------------------------|-----------|
| Import path casing mismatch (`Admin` vs `admin`) | Match directory name exactly (POSIX file systems are case-sensitive). |
| Spinner never ends                       | Confirm `/api/get-gallery-order` returns a non-empty JSON array. |
| HMR crashes / unknown port already in use| Kill stray node process; restart `npm run dev`. |

---
**Last updated:** $(date) 