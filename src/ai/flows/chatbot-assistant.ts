// Use server directive.
'use server';

/**
 * @fileOverview A chatbot assistant flow to answer user questions or guide them to relevant resources.
 *
 * - chatbotAssistant - A function that processes user inquiries and provides responses or escalates to a human agent.
 * - ChatbotAssistantInput - The input type for the chatbotAssistant function.
 * - ChatbotAssistantOutput - The return type for the chatbotAssistant function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatbotAssistantInputSchema = z.object({
  userQuery: z.string().describe('The user\u0027s question or inquiry.'),
  orderDetails: z.string().optional().describe('Optional order details related to the query.'),
});
export type ChatbotAssistantInput = z.infer<typeof ChatbotAssistantInputSchema>;

const ChatbotAssistantOutputSchema = z.object({
  response: z.string().describe('The chatbot\u0027s response to the user query.'),
  escalateToAgent: z.boolean().describe('Whether the query should be escalated to a human agent.'),
});
export type ChatbotAssistantOutput = z.infer<typeof ChatbotAssistantOutputSchema>;

export async function chatbotAssistant(input: ChatbotAssistantInput): Promise<ChatbotAssistantOutput> {
  return chatbotAssistantFlow(input);
}

const escalateToAgentTool = ai.defineTool({
  name: 'escalateToAgent',
  description: 'Use this tool when the user needs to be escalated to a human agent.',
  inputSchema: z.object({
    reason: z.string().describe('The reason for escalating the user to a human agent.'),
  }),
  outputSchema: z.literal('OK'),
},
async (input) => {
  console.log('Escalating to agent with reason: ' + input.reason);
  return 'OK';
});

const chatbotAssistantPrompt = ai.definePrompt({
  name: 'chatbotAssistantPrompt',
  input: {schema: ChatbotAssistantInputSchema},
  output: {schema: ChatbotAssistantOutputSchema},
  tools: [escalateToAgentTool],
  prompt: `You are a customer support chatbot for an e-commerce website.

  Your goal is to answer user questions and guide them to relevant resources.
  If you cannot answer the question or the user needs help from a human agent, you should use the escalateToAgent tool.

  Here is the user's query:
  {{userQuery}}

  Here are the order details (if any):
  {{#if orderDetails}}
  {{orderDetails}}
  {{else}}
  No order details provided.
  {{/if}}

  If the user asks about a specific order, ask them for the order number, and use the orderDetails if provided.

  Respond to the user query in a helpful and informative way.
  If you are escalating to a human agent, set escalateToAgent to true, otherwise, set it to false.  If escalateToAgent is true, make sure to call the escalateToAgent tool.

  Format your response as a JSON object with the following keys:
  - response: The chatbot's response to the user query.
  - escalateToAgent: Whether the query should be escalated to a human agent (true or false).
`,
});

const chatbotAssistantFlow = ai.defineFlow(
  {
    name: 'chatbotAssistantFlow',
    inputSchema: ChatbotAssistantInputSchema,
    outputSchema: ChatbotAssistantOutputSchema,
  },
  async input => {
    const {output} = await chatbotAssistantPrompt(input);
    return output!;
  }
);
