# HR-OS Pulse

AI-Powered Talent Intelligence Layer - A high-fidelity HR Decision Support System (DSS) that acts as an intelligent co-pilot for HR Directors.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Recharts** (data visualization)
- **Lucide React** (icons)
- **OpenAI GPT** (AI-powered insights - optional)

## Features

### Core Modules

1. **Intelligence Dashboard** - Bento Grid overview showing Workforce Readiness, Skill Gaps, and At-Risk Talent
2. **TNA & Competency Engine** - Maps appraisal scores against job-specific competency matrices
3. **Personalized Growth Paths** - AI-generated training recommendations
4. **Succession & Promotion Matrix** - 9-box grid visualization for high-potential employees
5. **Ghostwriter Suite** - Draft celebration, motivation, and notification messages
6. **Audit & Rationale** - Every AI insight includes data-driven reasoning

## Getting Started

### Installation

```bash
npm install
```

### AI Integration Setup (Optional)

To enable AI-powered rationale generation:

1. Install OpenAI package:
   ```bash
   npm install openai
   ```

2. Create `.env.local` file:
   ```env
   OPENAI_API_KEY=your_api_key_here
   OPENAI_MODEL=gpt-4o-mini
   ```

3. Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

See `AI_SETUP.md` for detailed instructions.

**Note:** The app works without AI - it will use fallback responses if API key is not configured.

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/              # Next.js App Router pages
│   ├── api/          # API routes
│   │   └── ai/       # AI service endpoints
│   └── ...           # Page routes
├── components/       # React components
│   ├── dashboard/   # Dashboard-specific components
│   ├── succession/  # Succession matrix components
│   └── ui/          # Reusable UI components
├── data/            # Seed data and mock data
├── lib/             # Utility functions
│   ├── ai-service.ts    # OpenAI integration (server-side)
│   ├── ai-client.ts     # AI API client (client-side)
│   ├── business-rules.ts # Business logic
│   └── ...          # Other utilities
└── types/           # TypeScript type definitions
```

## Design System

- **Aesthetic**: Modern Enterprise SaaS
- **Colors**: Deep Slate backgrounds with Electric Indigo accents
- **Effects**: Glassmorphism with backdrop-blur
- **Visualizations**: Radar Charts (competency mapping), Sparklines (performance trends)

## License

Private - HR-OS Pulse
# HR_AI
