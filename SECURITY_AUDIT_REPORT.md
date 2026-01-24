# Coindrop.to Security Audit Report

## 🚨 CRITICAL SECURITY ISSUES
(Issues requiring immediate attention)

**Issue:** Stored Cross-Site Scripting (XSS)
**Location:** `pages/api/createPiggybank.ts` and `components/PublicPiggybankPage/PublicPiggybankPage.tsx`
**Risk:** An attacker can create a piggybank with a malicious `website` URL (e.g., `javascript:alert(cookies)`). When a user visits the piggybank page and clicks the website link, the malicious script executes. This could lead to account takeover or data theft.
**Fix:** Validate the `website` field in `createPiggybank.ts` using `validator.isURL` and ensure it uses `http` or `https`. Additionally, sanitize the link in the frontend.
**Effort:** Low (< 1 hour)

---

### ⚠️ SECURITY RECOMMENDATIONS
(Important but not critical)

**Issue:** Weak Admin Authentication
**Location:** `server/middleware/requireAdminPassword.ts`
**Impact:** The admin endpoints rely on a shared password sent in the request body. If the `ADMIN_PASSWORD` env var is weak or leaked, all admin functions are compromised. It also lacks accountability.
**Fix:** Implement role-based access control (RBAC) using Firebase Auth (e.g., set custom claims for admins) instead of a shared password.
**Effort:** Medium (2-4 hours)

**Issue:** Missing Security Headers
**Location:** `next.config.js`
**Impact:** The application is missing standard HTTP security headers (HSTS, X-Frame-Options, X-XSS-Protection, etc.), making it more susceptible to clickjacking, MITM attacks, and XSS.
**Fix:** Configure `headers` in `next.config.js` to return appropriate security headers.
**Effort:** Low (< 1 hour)

**Issue:** Missing Rate Limiting
**Location:** API Routes
**Impact:** API endpoints are vulnerable to abuse (spam creation of piggybanks, brute force).
**Fix:** Implement rate limiting middleware (e.g., `rate-limiter-flexible` with Redis or memory) for sensitive endpoints.
**Effort:** Medium (2-4 hours)

---

### 💡 HIGH-VALUE IMPROVEMENTS
(Ranked by impact-to-effort ratio)

**#1: Add Input Validation**
**Impact:** Prevents bad data from entering the database and reduces runtime errors.
**Implementation:** Use `zod` schema validation in API routes (already installed). Validate `piggybankData` structure fully.
**Effort:** Low
**Priority:** High

**#2: Upgrade Dependencies**
**Impact:** access to security fixes and performance improvements.
**Implementation:** Update `firebase` to v9 modular SDK completely (some parts seem mixed), and `next` to a newer version (carefully).
**Effort:** Medium
**Priority:** Medium

---

### 📊 SUMMARY
- Total critical issues: 1
- Total security recommendations: 3
- Total quick wins identified: 1
- Estimated total time for all quick wins: 2 hours

---

### 🎯 RECOMMENDED ACTION PLAN

1. Fix the Stored XSS in `createPiggybank.ts`.
2. Add Security Headers in `next.config.js`.
3. Implement `zod` validation for API inputs.
4. Replace shared admin password with Firebase Custom Claims.
