<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/1atgkxFINDeL5Aw-wKQIx-AmNpeELFzAr

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

> **No API key?** The app automatically falls back to realistic simulated
> "Demo Data" so the full UI — search, forecasts, comparison table, and
> accuracy chart — is explorable without any setup. A "Demo Data" badge
> appears on the forecast card whenever live Gemini data isn't being used.

## Features

- AI-aggregated current conditions from three simulated weather sources, with a Gemini-generated consensus "Best Forecast" and reasoning
- 5-day outlook strip
- Source comparison table with per-provider confidence scores
- 7-day historical accuracy chart per source
- °C / °F unit toggle
- Light / dark theme toggle (persisted, respects system preference)
- Recent searches and quick-pick city chips
- Geolocation-based search
