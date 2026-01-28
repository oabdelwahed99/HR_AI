# How to Verify AI is Working

## Quick Verification Methods

### 1. **Check the Navbar Status Indicator** (Easiest)
- Look at the top navigation bar
- You'll see an **AI Status Indicator** showing:
  - 🟢 **"AI Active"** (Green) = AI is working
  - 🔴 **"AI Error"** (Red) = AI has issues
  - 🟡 **"Not Configured"** (Yellow) = API key not set up
- Click the **"Test"** button to run a quick test

### 2. **Settings Page** (`/settings`)
- Navigate to Settings from the sidebar
- You'll see:
  - **AI Configuration Status** - Shows current status
  - **Setup Instructions** - Step-by-step guide
  - **Test AI Connection** - Click "Run AI Test" button
  - **Test Results** - Shows success/failure with details

### 3. **Check AI Rationale Sections**
- Look for sections labeled **"AI Rationale"** with a sparkle icon ⭐
- These appear in:
  - **Dashboard** - Intelligence Hub cards
  - **TNA & Competency** - Gap analysis cards
  - **Growth Paths** - Training recommendations
  - **Succession Matrix** - Audit & Rationale sidebar
  - **Ghostwriter** - Generated messages

**If AI is working:**
- Rationale text will be dynamically generated
- Content will vary based on employee data
- More detailed and contextual explanations

**If AI is NOT working:**
- Uses fallback/hardcoded responses
- Same content every time
- Still functional, but not AI-generated

### 4. **Browser Console**
- Open browser DevTools (F12)
- Check Console tab for messages:
  - ✅ `"OpenAI API key is configured"` = Good
  - ⚠️ `"OPENAI_API_KEY not found"` = Not configured
  - ❌ `"OpenAI API error"` = Connection issue

### 5. **Test API Endpoints Directly**
You can test the API endpoints:

```bash
# Test status
curl http://localhost:3000/api/ai/status

# Test AI functionality
curl -X POST http://localhost:3000/api/ai/test \
  -H "Content-Type: application/json" \
  -d '{"testPrompt": "Say hello"}'
```

## Visual Indicators

### ✅ AI is Working
- Status indicator shows green "AI Active"
- Sparkle icons appear on AI-powered features
- Rationale text is unique and contextual
- Test button shows "Success" response

### ❌ AI is NOT Working
- Status indicator shows red/yellow
- Fallback messages appear
- Same rationale text across employees
- Test shows error message

## Troubleshooting

### Status shows "Not Configured"
1. Check if `.env.local` exists in root directory
2. Verify `OPENAI_API_KEY=sk-...` is set
3. Restart dev server: `npm run dev`
4. Check that key starts with `sk-`

### Status shows "AI Error"
1. Verify API key is valid at https://platform.openai.com/api-keys
2. Check you have credits in OpenAI account
3. Review error message in Settings page
4. Check network connectivity

### Test Fails
- Check browser console for detailed errors
- Verify API key format (should start with `sk-`)
- Ensure OpenAI package is installed: `npm install openai`
- Check OpenAI dashboard for rate limits or account issues

## Quick Test Checklist

- [ ] `.env.local` file exists with `OPENAI_API_KEY`
- [ ] Dev server restarted after adding API key
- [ ] Status indicator in navbar shows green
- [ ] Settings page test succeeds
- [ ] AI Rationale sections show unique content
- [ ] No errors in browser console

## Still Not Working?

1. **Check Settings Page** - Most detailed diagnostics
2. **Review AI_SETUP.md** - Complete setup guide
3. **Check Server Logs** - Look for OpenAI API errors
4. **Verify API Key** - Test key directly at OpenAI platform
