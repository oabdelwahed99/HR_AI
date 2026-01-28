# Deployment Fix Guide

## Issues Identified

1. **Repository Mismatch**: Vercel builds from `hr_ldb` but local remote is `HR_AI`
2. **Cached Build File**: `mockData.ts` exists in Vercel cache but not in git
3. **Build Errors**: TypeScript and ESLint errors need to be fixed

## Solution Steps

### Step 1: Verify Git Remote

```bash
# Check current remote
git remote -v

# If it shows HR_AI but Vercel uses hr_ldb, you may need to:
# Option A: Update Vercel to use HR_AI repository
# Option B: Update local remote to match hr_ldb
```

### Step 2: Commit All Fixes

```bash
# Add all fixed files
git add src/lib/message-templates.ts \
        src/app/growth/page.tsx \
        package.json \
        .npmrc \
        vercel.json \
        .vercelignore \
        next.config.mjs

# Commit
git commit -m "Fix build errors and deployment configuration

- Fix TypeScript: Add missing MessageTone templates
- Fix ESLint: Remove apostrophe error in growth page
- Update dependencies to latest versions
- Add .npmrc to suppress warnings
- Add .vercelignore to exclude mockData.ts
- Update next.config.mjs for clean builds
- Add vercel.json configuration"

# Push to GitHub
git push origin main
```

### Step 3: Clear Vercel Build Cache

1. Go to https://vercel.com/dashboard
2. Select your project
3. Go to **Settings** → **General**
4. Scroll to **"Build & Development Settings"**
5. Click **"Clear Build Cache"** or **"Redeploy"**
6. Or go to **Deployments** → Click three dots → **"Redeploy"**

### Step 4: Verify Repository Connection

In Vercel Dashboard:
1. Go to **Settings** → **Git**
2. Verify the connected repository matches your local remote
3. If mismatch, disconnect and reconnect to the correct repo

### Step 5: Force Clean Build (Optional)

If using Vercel CLI:
```bash
vercel --prod --force --no-cache
```

## Files Changed

- ✅ `src/lib/message-templates.ts` - Fixed missing MessageTone templates
- ✅ `src/app/growth/page.tsx` - Fixed ESLint apostrophe error
- ✅ `package.json` - Updated dependencies
- ✅ `.npmrc` - Added to suppress warnings
- ✅ `vercel.json` - Added deployment configuration
- ✅ `.vercelignore` - Added to exclude mockData.ts
- ✅ `next.config.mjs` - Updated for clean builds

## Expected Result

After completing these steps:
- ✅ Build should succeed without mockData.ts errors
- ✅ All TypeScript errors resolved
- ✅ All ESLint errors resolved
- ✅ Repository connection verified
