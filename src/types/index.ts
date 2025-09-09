export interface Keyword {
  id: number;
  keyword: string;
  avgQs: number;
}

export interface Account {
  id: number;
  name: string;
  status: string;
}

export interface Campaign {
  id: number;
  name: string;
  accountId: string;
}

export interface AdGroup {
  id: number;
  name: string;
  campaignId: string;
}

export interface KeywordResponse {
  keywords: Keyword[];
  total: number;
  page: number;
  limit: number;
}
