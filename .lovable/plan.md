# Fix "Admin access required" after the security hardening

Your password is fine. The sign-in logs show `socials@basicsocials.com` successfully logging in several times in the last few minutes (the one rejected attempt was a single mistyped entry). The problem happens *after* login: the dashboard's admin check fails, so it shows "Admin access required".

## What actually broke

The recent security change moved the `is_admin()` helper into a locked-down `private` area of the database and rewrote every access rule to call it. Those rules run as the signed-in user — and signed-in users were deliberately given no access to that private area. So every admin query (roles, posts, case studies, media, applications) now errors out instead of returning data, which the dashboard reads as "not an admin".

Confirmed state:
- The account exists and holds the `admin` role (user `74768007…`).
- The role row is intact; only the access rules are unreachable.

## The fix

Rewrite the access rules so they no longer depend on a private helper function at all. Each admin rule becomes a direct check against the roles table:

```text
EXISTS (select 1 from public.user_roles
        where user_id = auth.uid() and role = 'admin')
```

This keeps the same behaviour, keeps the security scanner clean (no privileged function callable by signed-in users), and removes the broken dependency.

Rules to update: profiles, user_roles, posts, case_studies, media, site_settings, job_applications, and the storage rules for the `media` and `resumes` buckets.

For the roles table itself the rule becomes simply "you can read your own role rows", which avoids any circular lookup.

## Password

No password change is needed — your existing one works. If you still want it set to a specific value, say so and it can be reset separately.

## Verification

After the change: sign in at `/admin/login`, confirm the dashboard loads with blog posts and case studies listed, and re-run the security scan to confirm no new warnings.

## Technical notes

- Single migration: drop and recreate the affected policies with the inline `EXISTS` predicate, then drop `private.is_admin()` / `private.has_role()` and the `private` schema.
- No application code changes required; `src/lib/use-admin.ts` already reads `user_roles` directly and will start succeeding once its select policy works.
