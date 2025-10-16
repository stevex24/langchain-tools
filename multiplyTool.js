import 'dotenv/config';
import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage } from "@langchain/core/messages";
import { z } from "zod";

// Define the multiply tool
const multiply = {
  name: "multiply",
  description: "Multiply two numbers together",
  schema: z.object({
    a: z.number().describe("First number"),
    b: z.number().describe("Second number"),
  }),
  func: async ({ a, b }) => {
    console.log(`📣 multiply() called with: a=${a}, b=${b}`);
    return a * b;
  },
};

// Create the LLM
const llm = new ChatOpenAI({
  model: "gpt-3.5-turbo",
  temperature: 0,
});

// Bind the tool to the model
const llmWithTools = llm.bindTools([multiply]);

// Run the example
const run = async () => {
  console.log("=== Example 1: Multiply Tool ===");
  const response = await llmWithTools.invoke([
    new HumanMessage("What is 15 multiplied by 23?")
  ]);
  console.log("AI Response:", response.content);
  console.log("Tool calls:", response.tool_calls);

  // Optional: also compute and show the product directly
  const product = await multiply.func({ a: 15, b: 23 });
  console.log("Manual result:", product);
};

// Execute the run function
run().catch(console.error);
