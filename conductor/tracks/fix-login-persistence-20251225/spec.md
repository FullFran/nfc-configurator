# Specification: Fix Login Persistence

## 1. Overview
The user is experiencing an issue where the login session is not persisted. After logging in, they are asked to log in again. This indicates a failure in cookie persistence or session restoration.

## 2. Functional Requirements
- Users must remain logged in after page refresh.
- Users must remain logged in after closing and reopening the browser (unless explicitly logged out or session expired).
- Session cookie must be correctly set with appropriate flags.

## 3. Root Cause Analysis (Hypothesis)
- `secure: true` in development without HTTPS?
- Missing Middleware to refresh session?
- Cookie path or domain issues?

## 4. Acceptance Criteria
- [ ] Login allows access to dashboard.
- [ ] Refreshing dashboard does not redirect to login.
- [ ] Opening dashboard in new tab works.
- [ ] Restarting browser (if session is persistent) keeps user logged in.
