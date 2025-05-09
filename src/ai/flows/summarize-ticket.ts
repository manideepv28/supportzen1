// use server'
'use server';

/**
 * @fileOverview Summarizes ticket history and user details for support agents.
 *
 * - summarizeTicket - A function that summarizes the ticket.
 * - SummarizeTicketInput - The input type for the summarizeTicket function.
 * - SummarizeTicketOutput - The return type for the summarizeTicket function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTicketInputSchema = z.object({
  ticketHistory: z
    .string()
    .describe('The complete history of the ticket, including user queries and agent responses.'),
  userDetails: z.string().describe('Details about the user who submitted the ticket.'),
});
export type SummarizeTicketInput = z.infer<typeof SummarizeTicketInputSchema>;

const SummarizeTicketOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the ticket history and user details.'),
});
export type SummarizeTicketOutput = z.infer<typeof SummarizeTicketOutputSchema>;

export async function summarizeTicket(input: SummarizeTicketInput): Promise<SummarizeTicketOutput> {
  return summarizeTicketFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeTicketPrompt',
  input: {schema: SummarizeTicketInputSchema},
  output: {schema: SummarizeTicketOutputSchema},
  prompt: `You are a support agent assistant. Your job is to summarize the ticket history and user details so the support agent can quickly understand the context of the issue.

Ticket History: {{{ticketHistory}}}

User Details: {{{userDetails}}}

Summary:`,
});

const summarizeTicketFlow = ai.defineFlow(
  {
    name: 'summarizeTicketFlow',
    inputSchema: SummarizeTicketInputSchema,
    outputSchema: SummarizeTicketOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
