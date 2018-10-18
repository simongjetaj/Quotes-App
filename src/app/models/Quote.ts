export interface Quote {
  $key?: string;
  quote: string;
  author: string;
  category: string;
  createdAt: number;
  apiQuoteId?: string;
  showApiQuote?: boolean;
}