
import { GoogleGenAI } from "@google/genai";
import { MOCK_ITEMS, MOCK_ALERTS, MOCK_LOCATIONS, MOCK_WAREHOUSES, MOCK_MOVEMENTS } from './constants';

export const askInventoryAssistant = async (question: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const context = `
      You are NexusAI, an advanced Warehouse Intelligence System.
      
      Current State:
      - Active Locations: ${MOCK_LOCATIONS.length}
      - Managed SKUs: ${MOCK_ITEMS.length}
      - System Alerts: ${MOCK_ALERTS.length}
      - Warehouses: ${MOCK_WAREHOUSES.length}

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

export const generateReportInsight = async (reportType: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const dataContext = {
    itemsCount: MOCK_ITEMS.length,
    totalValue: MOCK_ITEMS.reduce((acc, i) => acc + (i.price * i.available_quantity), 0),
    movementsCount: MOCK_MOVEMENTS.length,
    locationsCount: MOCK_LOCATIONS.length,
  };

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a brief, 2-sentence executive insight for a ${reportType} report based on these metrics: ${JSON.stringify(dataContext)}. 
               Focus on efficiency, risk, and optimization. Professional tone.`,
    config: {
      temperature: 0.4
    }
  });

  return response.text || "Analysis pending system synchronization.";
};

export const suggestBinAllocation = async (itemType: string, warehouseCode: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const warehouse = MOCK_WAREHOUSES.find(w => w.code === warehouseCode);
  
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest the best storage zone and bin for a new shipment of ${itemType} in warehouse ${warehouse?.name}.
               Current Zones: ${JSON.stringify(warehouse?.zones?.map(z => ({ name: z.name, type: z.zone_type, code: z.code })))}.
               Return JSON: { suggestedZoneCode: string, reason: string, priority: 'high' | 'medium' | 'low' }`,
    config: { responseMimeType: "application/json" }
  });

  try {
    return JSON.parse(response.text || "{}");
  } catch (e) {
    return { suggestedZoneCode: warehouse?.zones?.[0]?.code || 'N/A', reason: "Standard allocation protocol.", priority: 'medium' };
  }
};

export const autoIdentifyItem = async (base64Image: string, includeCharacteristics: boolean = true) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const characteristicPrompt = includeCharacteristics 
    ? "Suggest 3-5 technical characteristics specific to this item type (e.g., 'Voltage', 'Weight', 'Dimensions', 'Material')."
    : "Do not suggest any characteristics.";

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: `Act as an expert industrial inventory inspector. Analyze this image for SKU registration.
                 Return ONLY a JSON object with:
                 - title: A professional, descriptive product name.
                 - category: Most likely warehouse category (e.g., Electronics, Industrial Parts, Tools).
                 - suggested_price: A number representing realistic market value in USD.
                 - condition: Choose one: 'new', 'used_good', 'used_fair', 'damaged'.
                 - description: A detailed, technical, 2-3 sentence description.
                 - characteristics: ${includeCharacteristics ? 'An array of { "label": string, "value": string } objects.' : 'An empty array.'}
                 
                 ${characteristicPrompt}` 
        }
      ]
    },
    config: { 
      responseMimeType: "application/json" 
    }
  });
  
  const text = response.text || "{}";
  try {
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    console.error("Failed to parse JSON from Gemini:", text);
    return {};
  }
};

export const analyzeMovementRisk = async (itemName: string, fromZone: string, toZone: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Evaluate the risk of moving item "${itemName}" from "${fromZone}" to "${toZone}".
               Consider potential hazards, temperature requirements, and efficiency.
               Return JSON: { riskScore: number (0-100), riskLevel: 'low' | 'medium' | 'high', reason: string, suggestion: string }`,
    config: { responseMimeType: "application/json" }
  });

  try {
    const text = response.text || "{}";
    const cleanJson = text.replace(/```json/g, "").replace(/```/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (e) {
    return { riskScore: 0, riskLevel: 'low', reason: "Validation complete.", suggestion: "Proceed with caution." };
  }
};
