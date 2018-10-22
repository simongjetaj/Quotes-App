export interface Quote {
  $key?: string;
  quote: string;
  author: string;
  cat: string;
  createdAt: number;
  apiQuoteId?: string;
  showApiQuote?: boolean;
}