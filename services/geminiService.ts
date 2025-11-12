
import { GoogleGenAI, Chat } from "@google/genai";
import type { ChatMessage } from '../types';

let chat: Chat | null = null;

function getChatInstance(): Chat {
    if (!chat) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY is not set in environment variables.");
        }
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chat = ai.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are an expert AI tutor for secondary school students. Your name is Smarty. 
                You are friendly, encouraging, and knowledgeable. 
                When a student asks for help, guide them to the answer instead of just providing it. 
                Break down complex topics into simple, understandable concepts. 
                You can recommend lessons if the student seems to be struggling with a particular topic.`,
            },
        });
    }
    return chat;
}

export async function sendMessageToAI(message: string, history: ChatMessage[]): Promise<string> {
    try {
        const chatInstance = getChatInstance();
        // Note: The history param is for potential future use if we need to rebuild chat state.
        // The `chat` instance from `ai.chats.create` already maintains history.
        const response = await chatInstance.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to AI:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
}
