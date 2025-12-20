
import { GoogleGenAI } from "@google/genai";
import { MOCK_ITEMS, MOCK_ALERTS, MOCK_LOCATIONS } from './constants';

export const askInventoryAssistant = async (question: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const context = `
      You are NexusAI, an advanced Warehouse Intelligence System.
      
      Current State:
      - Active Locations: ${MOCK_LOCATIONS.length}
      - Managed SKUs: ${MOCK_ITEMS.length}
      - System Alerts: ${MOCK_ALERTS.length}
      - Featured Deals: ${MOCK_ITEMS.filter(i => i.is_featured).length}

      Inventory Samples:
      ${MOCK_ITEMS.slice(0, 5).map(i => `${i.title} (${i.available_quantity} available, price $${i.price})`).join('\n')}

      Mission: Provide concise, professional intelligence reports or inventory findings to the manager.
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: { 
        systemInstruction: context,
        temperature: 0.2,
      }
    });

    return response.text || "No intelligence generated.";
  } catch (error) {
    console.error("Gemini Failure:", error);
    return "Intelligence failure. Please retry.";
  }
};

export const autoIdentifyItem = async (base64Image: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: "Analyze this image for inventory entry. Return JSON: { title: string, category: string, suggested_price: number, condition: string, tags: string[] }" }
      ]
    },
    config: { responseMimeType: "application/json" }
  });
  
  const text = response.text || "{}";
  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Failed to parse JSON from Gemini:", text);
    return {};
  }
};
