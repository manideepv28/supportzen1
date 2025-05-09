import { config } from 'dotenv';
config();

import '@/ai/flows/chatbot-assistant.ts';
import '@/ai/flows/summarize-ticket.ts';
import '@/ai/flows/suggest-faq-content.ts';