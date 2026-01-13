
import { GoogleGenAI, Type } from "@google/genai";
import { BIReport } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateBIReport = async (target: string, zone: string): Promise<BIReport> => {
  const prompt = `Sei il sistema di intelligence REVENUE DIGGER di Forge Business. 
    Analizza opportunità di business per:
    Target: ${target}
    Zona: ${zone}

    ISTRUZIONE CRITICA: Identifica 3 Profit Engines (soluzioni di business concrete, NO solo marketing).
    Per OGNI Profit Engine, devi generare un Business Model Canvas (BMC) completo e specifico che spieghi come implementare esattamente quella specifica soluzione.
    
    Identifica 3 Profit Engines ordinati per redditività potenziale nella zona ${zone}.`;

  const bmcSchema = {
    type: Type.OBJECT,
    properties: {
      customerSegments: { type: Type.STRING },
      valuePropositions: { type: Type.STRING },
      channels: { type: Type.STRING },
      customerRelationships: { type: Type.STRING },
      revenueStreams: { type: Type.STRING },
      keyActivities: { type: Type.STRING },
      keyResources: { type: Type.STRING },
      keyPartnerships: { type: Type.STRING },
      costStructure: { type: Type.STRING }
    },
    required: [
      "customerSegments", "valuePropositions", "channels", 
      "customerRelationships", "revenueStreams", "keyActivities", 
      "keyResources", "keyPartnerships", "costStructure"
    ]
  };

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      temperature: 0.85,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          painAnalysis: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                pain: { type: Type.STRING },
                intensity: { type: Type.STRING },
                description: { type: Type.STRING }
              },
              required: ["pain", "intensity", "description"]
            }
          },
          existingSolutions: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                segment: { type: Type.STRING },
                currentSolution: { type: Type.STRING },
                whyInsufficient: { type: Type.STRING }
              },
              required: ["segment", "currentSolution", "whyInsufficient"]
            }
          },
          redOcean: { type: Type.STRING },
          blueOcean: { type: Type.STRING },
          marketSize: {
            type: Type.OBJECT,
            properties: {
              tam: { type: Type.STRING },
              sam: { type: Type.STRING },
              som: { type: Type.STRING },
              explanation: { type: Type.STRING }
            },
            required: ["tam", "sam", "som", "explanation"]
          },
          profitEngines: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                solutionName: { type: Type.STRING },
                coreOffer: { type: Type.STRING },
                monetizationModel: { type: Type.STRING },
                profitPotential: { type: Type.NUMBER },
                unfairAdvantage: { type: Type.STRING },
                difficulty: { type: Type.STRING },
                bmc: bmcSchema
              },
              required: ["solutionName", "coreOffer", "monetizationModel", "profitPotential", "unfairAdvantage", "difficulty", "bmc"]
            }
          }
        },
        required: ["painAnalysis", "existingSolutions", "redOcean", "blueOcean", "marketSize", "profitEngines"]
      }
    }
  });

  if (!response.text) throw new Error("Estrazione fallita.");
  return JSON.parse(response.text) as BIReport;
};
