export interface Ticket {
  id: string;
  subject: string;
  description: string;
  orderId?: string;
  status: 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  priority: 'Low' | 'Medium' | 'High';
  customer: { name: string; email: string };
  agent?: { name: string };
  createdAt: string; 
  updatedAt: string; 
  responses: Array<{ author: string; message: string; timestamp: string }>;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string; 
  category: string;
  tags: string[];
  lastUpdated: string;
  author: string;
  imageUrl?: string;
  views?: number;
}

export const mockTickets: Ticket[] = [
  {
    id: 'TKT-001',
    subject: 'Cannot reset password',
    description: 'I am trying to reset my password but I am not receiving the reset email. My email is user@example.com.',
    orderId: 'ORD-123',
    status: 'Open',
    priority: 'High',
    customer: { name: 'Alice Wonderland', email: 'alice@example.com' },
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    responses: [
      { author: 'Alice Wonderland', message: 'I am trying to reset my password but I am not receiving the reset email.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()},
      { author: 'SupportBot', message: 'I understand you\'re having trouble resetting your password. Have you checked your spam folder?', timestamp: new Date(Date.now() - 1.9 * 24 * 60 * 60 * 1000).toISOString()},
    ],
  },
  {
    id: 'TKT-002',
    subject: 'Late Delivery for Order ORD-456',
    description: 'My order ORD-456 was supposed to arrive yesterday but it hasn\'t. Can I get an update?',
    orderId: 'ORD-456',
    status: 'In Progress',
    priority: 'Medium',
    customer: { name: 'Bob The Builder', email: 'bob@example.com' },
    agent: { name: 'Jane Doe' },
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(), // 3 hours ago
    responses: [
      { author: 'Bob The Builder', message: 'My order ORD-456 was supposed to arrive yesterday but it hasn\'t. Can I get an update?', timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()},
      { author: 'Jane Doe', message: 'Hi Bob, I\'m looking into this for you. I\'ll get back to you with an update shortly.', timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()},
    ],
  },
  {
    id: 'TKT-003',
    subject: 'Question about product features',
    description: 'Does the SmartWidget X support Bluetooth 5.0?',
    status: 'Resolved',
    priority: 'Low',
    customer: { name: 'Carol Danvers', email: 'carol@example.com' },
    agent: { name: 'Peter Parker' },
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    responses: [],
  },
    {
    id: 'TKT-004',
    subject: 'Refund request for damaged item',
    description: 'Item in order ORD-789 arrived damaged. I would like a refund.',
    orderId: 'ORD-789',
    status: 'Open',
    priority: 'High',
    customer: { name: 'David Copperfield', email: 'david@example.com' },
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    updatedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    responses: [],
  },
  {
    id: 'TKT-005',
    subject: 'Account login issue',
    description: 'I am unable to login to my account, it says "Invalid credentials" but I am sure my password is correct.',
    status: 'Closed',
    priority: 'Medium',
    customer: { name: 'Eve Harrington', email: 'eve@example.com' },
    agent: { name: 'Jane Doe' },
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000).toISOString(),
    responses: [],
  },
];

export const mockFaqItems: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'How do I reset my password?',
    answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page. You will receive an email with instructions on how to set a new password.',
    category: 'Account Management',
  },
  {
    id: 'faq-2',
    question: 'How can I track my order?',
    answer: 'Once your order is shipped, you will receive a tracking number via email. You can use this number on the carrier\'s website to track your package. You can also find tracking information in your order history on our website.',
    category: 'Orders & Shipping',
  },
  {
    id: 'faq-3',
    question: 'What is your return policy?',
    answer: 'We accept returns within 30 days of purchase for most items. Items must be in new, unused condition with original packaging. Some exclusions apply. Please visit our Returns Policy page for full details.',
    category: 'Returns & Refunds',
  },
  {
    id: 'faq-4',
    question: 'What payment methods do you accept?',
    answer: 'We accept Visa, MasterCard, American Express, PayPal, and Apple Pay.',
    category: 'Payments',
  },
  {
    id: 'faq-5',
    question: 'How do I contact customer support?',
    answer: 'You can contact customer support through our "Submit Inquiry" form, via live chat during business hours, or by emailing support@supportzen.com.',
    category: 'General Support',
  },
];


export const mockArticles: Article[] = [
  {
    id: 'article-1',
    title: 'Getting Started with Your New Smart Thermostat',
    summary: 'Learn how to set up and configure your new Smart Thermostat for optimal home comfort and energy savings.',
    content: '<p><strong>Installation:</strong> Follow the step-by-step guide included in your package. Ensure power is off before starting.</p><p><strong>Wi-Fi Connection:</strong> Connect your thermostat to your home Wi-Fi network through the device settings menu.</p><p><strong>App Setup:</strong> Download the companion app and create an account to control your thermostat remotely.</p>',
    category: 'Product Guides',
    tags: ['smart home', 'thermostat', 'setup'],
    lastUpdated: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Tech Guru',
    imageUrl: 'https://picsum.photos/seed/thermostat/400/250',
    views: 1250,
  },
  {
    id: 'article-2',
    title: 'Troubleshooting Common Printer Issues',
    summary: 'Quick fixes for when your printer is not responding, printing blurry, or showing error messages.',
    content: '<p><strong>Printer Not Responding:</strong> Check cable connections, ensure the printer is on, and restart both printer and computer.</p><p><strong>Blurry Prints:</strong> Clean print heads through printer software utility. Check ink/toner levels.</p><p><strong>Paper Jams:</strong> Carefully remove jammed paper following printer instructions. Avoid tearing paper.</p>',
    category: 'Troubleshooting',
    tags: ['printer', 'tech support', 'issues'],
    lastUpdated: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Support Team',
    imageUrl: 'https://picsum.photos/seed/printer/400/250',
    views: 870,
  },
  {
    id: 'article-3',
    title: 'Understanding Your Monthly Subscription Bill',
    summary: 'A detailed explanation of the charges and sections on your monthly subscription invoice.',
    content: '<p><strong>Subscription Tier:</strong> This section shows your current plan and its base cost.</p><p><strong>Usage Charges:</strong> If applicable, details any overages or pay-per-use services.</p><p><strong>Discounts & Promotions:</strong> Lists any applied discounts for the billing period.</p>',
    category: 'Billing',
    tags: ['subscription', 'invoice', 'payment'],
    lastUpdated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    author: 'Billing Department',
    imageUrl: 'https://picsum.photos/seed/billing/400/250',
    views: 2300,
  },
];
