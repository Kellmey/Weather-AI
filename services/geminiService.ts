import { GoogleGenAI } from "@google/genai";
import { WeatherReport } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are WeatherWise AI, an advanced meteorological aggregator.
Your goal is to provide the most accurate weather forecast by analyzing multiple sources.
You must output strictly valid JSON.
`;

export const fetchWeatherReport = async (location: string): Promise<WeatherReport> => {
  const prompt = `
    1. Search for the current weather forecast for "${location}" from three distinct sources: OpenWeatherMap, WeatherAPI, and AccuWeather.
    2. Get current Temperature (Celsius), Condition (e.g., Sunny, Rainy), Humidity (%), and Wind Speed (km/h).
    3. Analyze the data. If there are discrepancies, use your knowledge of regional provider accuracy to determine the "Best Forecast" (consensus).
    4. Assign a "confidenceScore" (0-100) to each source based on how close they are to the consensus and general reputation.
    5. Generate a "accuracyHistory" array for the past 7 days (Days: Mon, Tue, Wed, etc.) with SIMULATED historical accuracy scores (0-100) for each of the 3 sources to visualize trends.
    6. Provide a short "reasoning" for why the Best Forecast was chosen.

    Return the result as a raw JSON object (no markdown formatting, no backticks) with this structure:
    {
      "location": "City, Country",
      "bestForecast": {
        "snapshot": { "temp": number, "condition": string, "humidity": number, "windSpeed": number, "unit": "C" },
        "summary": "Short description like 'Partly cloudy with gentle breeze'",
        "reasoning": "Why this is the most likely outcome."
      },
      "sources": [
        { "name": "Source Name", "data": { "temp": number, "condition": string, "humidity": number, "windSpeed": number, "unit": "C" }, "confidenceScore": number }
      ],
      "accuracyHistory": [
        { "day": "Mon", "OpenWeatherMap": 85, "WeatherAPI": 88, "AccuWeather": 82 },
        ... (for 7 days)
      ],
      "lastUpdated": "${new Date().toISOString()}"
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        // Note: responseMimeType: 'application/json' is NOT allowed with googleSearch,
        // so we must rely on the prompt to enforce JSON structure and parse manually.
      }
    });

    const text = response.text || "";
    
    // Clean up potential markdown code blocks
    const jsonString = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    try {
      const data: WeatherReport = JSON.parse(jsonString);
      return data;
    } catch (parseError) {
      console.error("Failed to parse weather JSON:", text);
      throw new Error("Received malformed data from AI analysis.");
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};