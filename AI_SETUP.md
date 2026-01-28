# OpenAI Integration Setup Guide

## Prerequisites

1. **Install OpenAI package:**
   ```bash
   npm install openai
   ```

2. **Get OpenAI API Key:**
   - Visit https://platform.openai.com/api-keys
   - Create a new API key
   - Copy the key

3. **Configure Environment Variables:**
   
   Create a `.env.local` file in the root directory:
   ```env
   OPENAI_API_KEY=sk-your-api-key-here
   OPENAI_MODEL=gpt-4o-mini
   ```

   **Note:** `.env.local` is already in `.gitignore` and won't be committed.

## Available AI Functions

### 1. Gap Analysis Rationale
Generate AI-powered explanations for competency gaps:
```typescript
import { fetchGapAnalysisRationale } from "@/lib/ai-client";

const rationale = await fetchGapAnalysisRationale("emp-001");
```

### 2. Dashboard Insights
Generate AI insights for dashboard metrics:
```typescript
import { fetchDashboardInsight } from "@/lib/ai-client";

const insight = await fetchDashboardInsight(
  "Workforce Readiness",
  76,
  "up",
  5.2
);
```

### 3. AI Messages
Generate personalized messages:
```typescript
import { fetchAIMessage } from "@/lib/ai-client";

const message = await fetchAIMessage(
  "Celebration",
  "emp-001",
  { gapName: "Technical Architecture" },
  "Celebratory"
);
```

## API Routes

All AI functions are available via API routes:

- `POST /api/ai/gap-analysis` - Generate gap analysis rationale
- `POST /api/ai/dashboard-insight` - Generate dashboard insights
- `POST /api/ai/message` - Generate AI messages

## Fallback Behavior

If `OPENAI_API_KEY` is not configured:
- Functions will use fallback/hardcoded responses
- No errors will be thrown
- System continues to work with static rationale

## Model Selection

Default: `gpt-4o-mini` (cost-effective)
- Fast and affordable
- Good for most use cases

Alternative: `gpt-4o` or `gpt-4-turbo`
- More capable
- Higher cost
- Update `OPENAI_MODEL` in `.env.local`

## Cost Considerations

- `gpt-4o-mini`: ~$0.15 per 1M input tokens, $0.60 per 1M output tokens
- Typical gap analysis: ~500 tokens (~$0.0003 per call)
- Typical dashboard insight: ~400 tokens (~$0.0002 per call)
- Typical message: ~600 tokens (~$0.0004 per call)

## Testing

Test the integration:
1. Set up `.env.local` with your API key
2. Restart the dev server: `npm run dev`
3. Check browser console for any API errors
4. AI rationale should appear in place of hardcoded text

## Troubleshooting

**Error: "OPENAI_API_KEY not found"**
- Ensure `.env.local` exists in root directory
- Restart dev server after adding environment variables
- Check that key starts with `sk-`

**Error: "Failed to generate rationale"**
- Check API key is valid
- Verify you have credits in OpenAI account
- Check network connectivity
- Review server logs for detailed errors

**Fallback responses appearing:**
- API key may not be configured
- API call may have failed (check console)
- Rate limits may be hit (check OpenAI dashboard)
