
import { GoogleGenAI } from "@google/genai";
import { MOCK_ITEMS, MOCK_ALERTS, MOCK_LOCATIONS, MOCK_WAREHOUSES, MOCK_MOVEMENTS, MOCK_CATEGORIES } from './constants';

export const askInventoryAssistant = async (question: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const context = `You are NexusAI, an advanced Warehouse Intelligence System. MISSION: Provide concise reports.`;
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: { systemInstruction: context, temperature: 0.2 }
    });
    return response.text || "No intelligence generated.";
  } catch (error) {
    return "Intelligence failure. Please retry.";
  }
};

export const enhanceStory = async (rawText: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Transform this raw technical warehouse feedback into a professional, inspiring industrial success story. RAW: "${rawText}". Return JSON: { "title": string, "content": string, "suggested_tags": string[] }`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
};

export const generateStoryArt = async (content: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `A high-tech cinematic industrial digital art representing: "${content.slice(0, 100)}". Blueprint aesthetics, neon blue accents, ultra-modern logistics.` }] },
      config: { imageConfig: { aspectRatio: "16:9", imageSize: "1K" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch { return null; }
};

export const suggestSmartReply = async (lastMessage: string, context: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Based on this conversation context: "${context}", suggest 3 professional quick replies to: "${lastMessage}". Return ONLY a JSON array of strings.`,
    config: { responseMimeType: "application/json" }
  });
  try {
    return JSON.parse(response.text || "[]");
  } catch {
    return ["Understood.", "Checking stock now.", "Will confirm soon."];
  }
};

export const summarizeChat = async (messages: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const transcript = messages.map(m => `${m.sender_name}: ${m.text}`).join('\n');
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Summarize this industrial conversation into 3 key bullet points:\n${transcript}`,
  });
  return response.text || "Summary unavailable.";
};

export const generateReportInsight = async (reportType: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const dataContext = { itemsCount: MOCK_ITEMS.length, movementsCount: MOCK_MOVEMENTS.length };
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate a 2-sentence executive insight for ${reportType}. Context: ${JSON.stringify(dataContext)}`,
  });
  return response.text || "Analysis pending.";
};

export const suggestBinAllocation = async (itemType: string, warehouseCode: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Suggest storage zone for ${itemType} in warehouse ${warehouseCode}. Return JSON: { suggestedZoneCode: string, reason: string }`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
};

export const autoIdentifyItem = async (base64Image: string, includeCharacteristics: boolean = true) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { mimeType: 'image/jpeg', data: base64Image } },
        { text: `Identify item. Return JSON: { title, category_id, suggested_price, condition, description, characteristics, suggested_sku }` }
      ]
    },
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
};

export const suggestCategoryOptimization = async (categories: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analyze categories: ${JSON.stringify(categories)}. Return JSON: { suggestions: string[], optimization_score: number }`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
};

export const generateCategoryVisual = async (categoryName: string): Promise<string | null> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: { parts: [{ text: `High-tech industrial flat icon for "${categoryName}" category.` }] },
      config: { imageConfig: { aspectRatio: "1:1", imageSize: "1K" } }
    });
    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) return `data:image/png;base64,${part.inlineData.data}`;
    }
    return null;
  } catch { return null; }
};

export const generateAiSku = async (title: string, category: string, characteristics: any[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Generate industrial SKU for ${title}. Return JSON: { "sku": string }`,
    config: { responseMimeType: "application/json" }
  });
  try { return JSON.parse(response.text || "{}").sku; } 
  catch { return `SKU-${Date.now().toString().slice(-6)}`; }
};

export const analyzeMovementRisk = async (itemName: string, fromZone: string, toZone: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Risk of moving ${itemName}. Return JSON: { riskScore, riskLevel, reason, suggestion }`,
    config: { responseMimeType: "application/json" }
  });
  return JSON.parse(response.text || "{}");
};
