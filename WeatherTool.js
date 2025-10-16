import 'dotenv/config';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";
import fetch from "node-fetch";

// Define the weather tool
const getWeather = {
  name: "getWeather",
  description: "Get the current temperature for a given location using the Open-Meteo API.",
  schema: z.object({
    latitude: z.number().describe("Latitude of the location"),
    longitude: z.number().describe("Longitude of the location"),
  }),
  func: async ({ latitude, longitude }) => {
    console.log(`🌤️ getWeather() called: lat=${latitude}, lon=${longitude}`);
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();
    const temperature = data?.current_weather?.temperature;
    if (temperature === undefined) {
      return "Weather data unavailable.";
    }
    return `The current temperature is ${temperature}°C.`;
  },
};

// Create the LLM
const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

// Bind the tool to the model
const llmWithTools = llm.bindTools([getWeather]);

// Run the example
const run = async () => {
  console.log("=== Example 2: Weather Tool ===");
  const response = await llmWithTools.invoke([
    new HumanMessage("Use the weather tool to tell me the current temperature for latitude 36.9741 and longitude -122.0308.")
  ]);
  console.log("AI Response:", response.content);
  console.log("Tool calls:", response.tool_calls);

  // Optional: directly call the tool to show its result
  const result = await getWeather.func({ latitude: 36.9741, longitude: -122.0308 });
  console.log("Manual result:", result);
};

run().catch(console.error);
