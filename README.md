# LangChain Tools Assignment

This repository contains two examples demonstrating how to connect custom tools to a Large Language Model (LLM) using LangChain.

## Example 1: Multiply Tool
A simple tool that multiplies two numbers and logs the tool call.

- **File:** `multiplyTool.js`  
- Demonstrates binding a tool and verifying the tool call through console output.

### Console Output
=== Example 1: Multiply Tool ===
📣 multiply() called with: a=15, b=23
Tool calls: [ { name: 'multiply', args: { a: 15, b: 23 } } ]
Manual result: 345

**Explanation:**  
The LLM successfully recognized when to call the multiply tool.  
The console logs confirm both the function call and the correct product of 15 × 23 = 345.

---

## Example 2: Weather Tool
A custom tool that fetches current temperature data from the Open-Meteo API.

- **File:** `weatherTool.js`  
- Demonstrates tool invocation and integration of real-world data.

### Console Output
=== Example 2: Weather Tool ===
🌤️ getWeather() called: lat=36.9741, lon=-122.0308
Tool calls: [ { name: 'getWeather', args: { latitude: 36.9741, longitude: -122.0308 } } ]
Manual result: The current temperature is 18°C.

**Explanation:**  
The LLM invoked the weather tool correctly, fetched current data from the Open-Meteo API, and printed the result to the console.  
This confirms that the LLM can integrate custom code and external data sources.

---

## How to Run
1. Create a `.env` file containing your OpenAI API key:
OPENAI_API_KEY=your_key_here
2. Install dependencies:
3. Run the examples:
node multiplyTool.js
node weatherTool.js

---

## Author
**Steve Cross**  
UCSC Game Research Lab

