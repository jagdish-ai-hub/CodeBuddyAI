import { GoogleGenAI, Modality, Type } from "@google/genai";

// Instantiate only when needed to ensure key is available
const getAi = () => new GoogleGenAI({ apiKey: process.env.API_KEY });

// Helper: Decode base64 to Uint8Array
function decodeBase64(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// Helper: Play raw PCM audio
export const playGeneratedAudio = async (base64String: string) => {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext({ sampleRate: 24000 }); // Gemini TTS is 24kHz
    
    const pcmData = decodeBase64(base64String);
    
    // Create AudioBuffer (1 channel, PCM 16-bit)
    // We manually convert Int16 bytes to Float32 for the AudioBuffer
    const int16Data = new Int16Array(pcmData.buffer);
    const buffer = ctx.createBuffer(1, int16Data.length, 24000);
    const channelData = buffer.getChannelData(0);
    
    for (let i = 0; i < int16Data.length; i++) {
        // Normalize 16-bit integer to float [-1.0, 1.0]
        channelData[i] = int16Data[i] / 32768.0;
    }

    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
    
    // Cleanup context after playback to save resources
    source.onended = () => {
        setTimeout(() => ctx.close(), 1000);
    };

  } catch (e) {
    console.error("Error playing audio:", e);
  }
};

// 1. Learn More (Text)
export const getLearnMoreExplanation = async (concept: string, context: string, language: string = 'English'): Promise<string> => {
  if (!process.env.API_KEY) return "API Key missing. Please configure it.";

  const prompt = `
    You are a friendly, patient programming tutor for absolute beginners.
    Explain the concept: "${concept}" within the context of "${context}".
    
    IMPORTANT: Provide the explanation in **${language}**.
    
    Format your response EXACTLY as follows using Markdown:
    ### 💡 Concept Recap
    (Simple explanation in 1-2 sentences in ${language})
    
    ### 🌟 Example
    (A very simple code example or analogy)
    
    ### ✅ Do's & ❌ Don'ts
    (1 Do and 1 Don't tip in ${language})
    
    ### 🚀 Mini Challenge
    (A fun optional 1-line challenge in ${language})
    
    Keep it short, game-like, and encouraging. No complex jargon.
  `;

  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text || "Sorry, I couldn't generate an explanation right now.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Oops! My brain is tired. Try again later.";
  }
};

interface CheckCodeResponse {
  text: string;
  errorLine: number | null;
}

// 2. Code Validation (JSON)
export const checkCode = async (userCode: string, task: string, codingLanguage: string, outputLanguage: string = 'English'): Promise<CheckCodeResponse> => {
  if (!process.env.API_KEY) return { text: "API Key missing.", errorLine: null };

  const prompt = `
    You are a coding tutor. A beginner wrote this ${codingLanguage} code for the task: "${task}".
    Code:
    \`\`\`
    ${userCode}
    \`\`\`
    
    Analyze the code.
    Return a JSON object with:
    1. feedback: string (Use Markdown. Be kind. 1. Say what is right. 2. Explain mistake. 3. Show fix. Output in ${outputLanguage}.)
    2. errorLine: integer (The 1-based line number of the error. Return 0 if code is correct or error is general.)
  `;

  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING },
            errorLine: { type: Type.INTEGER }
          },
          required: ['feedback']
        }
      }
    });

    const json = JSON.parse(response.text || '{}');
    return {
        text: json.feedback || "Could not evaluate code.",
        errorLine: (json.errorLine && json.errorLine > 0) ? json.errorLine : null
    };
  } catch (error) {
    console.error(error);
    return { text: "Error checking code.", errorLine: null };
  }
};

// 3. Image Analysis (Multimodal)
export const analyzeCodeImage = async (base64Image: string): Promise<string> => {
  if (!process.env.API_KEY) return "API Key missing.";

  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: base64Image
            }
          },
          {
            text: "Extract the code from this image. Identify any errors. Explain the fix simply for a beginner. Provide the correct runnable code."
          }
        ]
      }
    });
    return response.text || "Could not analyze image.";
  } catch (error) {
    console.error("Image Analysis Error", error);
    return "Failed to analyze image. Please try again.";
  }
};

// 4. Voice Explanation (TTS)
export const getVoiceExplanation = async (text: string): Promise<string | null> => {
  if (!process.env.API_KEY) return null;

  try {
    const ai = getAi();
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: { parts: [{ text: text }] },
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: 'Puck' }, // Friendly tone
            },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || null;
  } catch (error) {
    console.error("TTS Error", error);
    return null;
  }
};

// 5. General Chat Tutor
export const getChatResponse = async (userMessage: string): Promise<string> => {
    if (!process.env.API_KEY) return "Please configure your API Key to chat with me.";

    const prompt = `
        You are 'CodeBuddy', a friendly, enthusiastic, and encouraging AI programming tutor.
        The user is a beginner.
        
        User's Question: "${userMessage}"
        
        Guidelines:
        - Keep answers concise (under 3 paragraphs).
        - Use simple analogies.
        - Use Markdown for formatting (bold, code blocks).
        - Be encouraging and fun (use emojis).
        - If they ask about something not related to coding, politely steer them back to programming.
    `;

    try {
        const ai = getAi();
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        return response.text || "I'm not sure how to answer that right now, but keep coding!";
    } catch (error) {
        console.error("Chat API Error", error);
        return "I'm having a little trouble thinking right now. Ask me again in a moment!";
    }
}