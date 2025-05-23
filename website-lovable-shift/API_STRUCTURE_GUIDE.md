# API Structure & Access Control Guide

## 1. Directory & Route Organization

- **Privileged (Admin) APIs:**
  - Path: `/api/v1/admin/*`
  - Purpose: Admin/privileged actions (e.g., gallery management)
  - Access: Require authentication (authc) and authorization (authz)

- **Public APIs:**
  - Path: `/api/v1/public/*`
  - Purpose: Public or user-level actions (e.g., calendar feeds)
  - Access: No auth or user-level auth as needed

- **User APIs (Optional):**
  - Path: `/api/v1/user/*`
  - Purpose: Authenticated user actions (e.g., profile, bookings)
  - Access: Require user authentication

## 2. Middleware Enforcement

- Apply authentication/authorization middleware to all `/api/v1/admin/*` routes.
- Public routes skip this middleware.
- Always check authz in the handler (defense in depth).

**Example (Pseudocode):**
```typescript
if (req.url.startsWith('/api/v1/admin/')) {
  await requireAdminAuthz(req, res);
}
```

## 3. API Versioning

- Use versioned paths: `/api/v1/`, `/api/v2/`, etc.
- Allows for safe evolution and deprecation of endpoints.

## 4. Naming & Documentation

- Use clear, descriptive names: `admin`, `public`, `user`, etc.
- Document which endpoints require privileged access.

## 5. Testing & Auditing

- Write tests to ensure privileged endpoints are not accessible without proper auth.
- Periodically audit routes for accidental exposure.

## 6. Example Structure

```
/api/
  v1/
    admin/
      gallery/
        arrange.ts      // Admin only
        rename-image.ts // Admin only
    public/
      calendar/
        events.ts       // Public
        ical-feed.ts    // Public
    user/
      profile.ts        // Authenticated users
```

## 7. Summary Table

| Path                | Auth Required? | Who Can Access?      | Example Use                |
|---------------------|---------------|----------------------|----------------------------|
| /api/v1/admin/*     | Yes           | Admins only          | Gallery management, etc.   |
| /api/v1/public/*    | No/Optional   | Anyone (or users)    | Calendar feeds, etc.       |
| /api/v1/user/*      | Yes           | Authenticated users  | User profile, bookings     |

---

**Follow this structure for scalable, secure, and maintainable API development.** 