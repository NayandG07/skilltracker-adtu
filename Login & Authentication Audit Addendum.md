# PHASE 0 — LOGIN / AUTHENTICATION

> **Document Index:** [Master Documentation Hub](INDEX.md) | **Next Phase:** [PWA Revamp Blueprint](pwa_revamp_audit_and_blueprint.md) | **Current Status:** [Implementation Status](IMPLEMENTATION_STATUS.md)

Before auditing the student portal, authenticate through the actual login page.

Use the following credentials **only for this browser testing session**:

- Login ID / Email: `surajlakda55@gmail.com`
- Password: `[provided separately by the user]`

IMPORTANT:
- Do NOT write the password into source code.
- Do NOT hardcode credentials into the redesigned application.
- Do NOT include credentials in screenshots, reports, logs, console output, or final documentation.
- Treat the credentials as temporary testing credentials.
- Do NOT change the password, account settings, profile information, academic records, submissions, or other persistent user data.
- Avoid performing destructive or irreversible actions.
- If the website provides a "Remember Me" option, do not enable it unless required for testing.
- After testing, log out where appropriate.

## Authentication Audit

Before proceeding with the rest of the website:

1. Open the actual login page.
2. Determine:
   - Login URL
   - Login form structure
   - Email/ID field
   - Password field
   - Login button
   - Forgot password flow
   - Remember-me functionality
   - Error handling
   - Loading state
   - Authentication persistence
   - Logout behavior
3. Test valid login.
4. Test navigation after authentication.
5. Determine whether authentication survives:
   - Page refresh
   - Opening another route
   - Closing/reopening the tab if safe to test
6. Inspect whether unauthorized routes are correctly protected.
7. Check what happens when a session expires.
8. Check logout behavior.
9. Check whether sensitive information appears in:
   - URLs
   - localStorage
   - sessionStorage
   - browser console
   - visible page content
10. Identify obvious authentication UX/security issues.

## Login UX Redesign

For the future redesign, recommend an improved authentication experience covering:

### Desktop
- Clean centered login layout
- Clear branding
- Student-friendly visual hierarchy
- Proper input states
- Password visibility toggle
- Loading state
- Validation
- Error messages

### Mobile
- Full responsive login screen
- Proper keyboard behavior
- Large touch targets
- Safe-area support
- No unnecessary horizontal scrolling
- Appropriate mobile spacing

### Security
The rebuilt application must:

- Never expose credentials in frontend source code.
- Never hardcode the provided email/password.
- Use the existing backend authentication mechanism where possible.
- Store authentication state securely according to the existing backend architecture.
- Protect authenticated routes.
- Handle expired sessions gracefully.
- Provide a proper logout mechanism.

## IMPORTANT

The credentials are for **browser auditing only**.

Do not reproduce the password anywhere in the final audit or implementation blueprint.

Once authentication succeeds, continue with:

**PHASE 1 — Understand the Existing Product**

and perform the complete desktop, mobile, functionality, UX, accessibility, API/data, PWA, and redesign audit described in the main prompt.