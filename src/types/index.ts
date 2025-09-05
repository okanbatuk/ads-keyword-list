export interface Keyword {
  id: number;
  keyword: string;
  avgQs: number;
}

export interface Campaign {
  id: number;
  name: string;
  status: string;
}

export interface AdGroup {
  id: number;
  name: string;
  status: string;
}

export interface KeywordResponse {
  keywords: Keyword[];
  total: number;
  page: number;
  limit: number;
}

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  field: 'keyword' | 'avgQs' | null;
  direction: SortDirection;
}
