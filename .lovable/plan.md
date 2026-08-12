# Set up the admin login for socials@basicsocials.com

An account with that email already exists in the backend and already holds the admin role, but its password is unknown, so sign-in fails and the dashboard shows "Admin access required". The fix is to set a known password on that existing account (not create a duplicate) and make sure the email is confirmed so login works immediately.

## What will happen

1. Add a temporary, secret-protected setup endpoint that runs once on the server with privileged access.
2. Call it once to:
   - set the password on `socials@basicsocials.com` to the one you provided,
   - mark the email as confirmed,
   - re-assert the admin role for that account.
3. Verify sign-in at `/admin/login` works and the dashboard loads.
4. Delete the temporary endpoint in the same change set so it never ships publicly.

## Login page cleanup

- Remove the "Need to create the first admin account?" sign-up toggle from `/admin/login`. Now that the admin exists, a public sign-up form on the admin page is an unnecessary exposure — the page becomes sign-in only, with a "forgot password" reset link instead.

## Result

- Email: `socials@basicsocials.com`
- Password: the one you supplied
- Signing in at `/admin/login` lands on the admin dashboard with full access to blog posts, case studies and media.

## Technical notes

- New file `src/routes/api/public/setup-admin.ts`: POST handler that compares a `x-setup-token` header against a one-off value using a constant-time check, then uses the service-role client (loaded inside the handler via `await import("@/integrations/supabase/client.server")`) with `auth.admin.listUsers` / `auth.admin.updateUserById` to set `password` and `email_confirm: true`, and upserts the `admin` row in `user_roles`.
- The route is invoked once against the running dev server, then removed. No credentials are stored in source; the password is passed in the request body at call time.
- No database migration is needed — the role rows and RLS policies from the recent security change already grant this account admin access through `private.is_admin()`.
- `src/routes/admin.login.tsx` loses the `mode` state and sign-up branch, gaining a `resetPasswordForEmail` link.
