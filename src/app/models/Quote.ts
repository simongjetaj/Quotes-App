export interface Quote {
  $id?: string;
  quote: string;
  author: string;
  cat: string;
  createdAt: number;
  apiQuoteId?: string;
  showApiQuote?: boolean;
}
