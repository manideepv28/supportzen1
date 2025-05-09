'use server';

/**
 * @fileOverview An AI agent that suggests relevant FAQ content based on a user inquiry.
 *
 * - suggestFaqContent - A function that suggests FAQ content based on user inquiry.
 * - SuggestFaqContentInput - The input type for the suggestFaqContent function.
 * - SuggestFaqContentOutput - The return type for the suggestFaqContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestFaqContentInputSchema = z.object({
  userInquiry: z.string().describe('The user inquiry to find relevant FAQ content for.'),
});
export type SuggestFaqContentInput = z.infer<typeof SuggestFaqContentInputSchema>;

const FaqContentSchema = z.object({
  question: z.string().describe('The FAQ question.'),
  answer: z.string().describe('The FAQ answer.'),
});

const SuggestFaqContentOutputSchema = z.array(FaqContentSchema).describe('An array of relevant FAQ content.');
export type SuggestFaqContentOutput = z.infer<typeof SuggestFaqContentOutputSchema>;

export async function suggestFaqContent(input: SuggestFaqContentInput): Promise<SuggestFaqContentOutput> {
  return suggestFaqContentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestFaqContentPrompt',
  input: {schema: SuggestFaqContentInputSchema},
  output: {schema: SuggestFaqContentOutputSchema},
  prompt: `You are a customer support AI assistant. A user has submitted the following inquiry:\n\n{{userInquiry}}\n\nBased on the inquiry, suggest relevant FAQ content from the following list. Return the results as a JSON array.\n\n[\n  {
    "question": "How do I reset my password?",
    "answer": "You can reset your password by clicking on the \"Forgot Password\" link on the login page."
  },
  {
    "question": "How do I track my order?",
    "answer": "You can track your order by logging into your account and viewing the order history."
  },
  {
    "question": "What payment methods do you accept?",
    "answer": "We accept Visa, Mastercard, American Express, and PayPal."
  },
  {
    "question": "How do I return an item?",
    "answer": "You can return an item by logging into your account and initiating a return request."
  },
  {
    "question": "How do I contact customer support?",
    "answer": "You can contact customer support by phone, email, or live chat."
  }
]
`,
});

const suggestFaqContentFlow = ai.defineFlow(
  {
    name: 'suggestFaqContentFlow',
    inputSchema: SuggestFaqContentInputSchema,
    outputSchema: SuggestFaqContentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
