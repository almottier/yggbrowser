export interface TorrentResult {
  id: number;
  title: string;
  seeders: number;
  leechers: number;
  downloads: number | null;
  size: number;
  category_id: number;
  uploaded_at: string;
  link: string;
}

export interface DetailTorrentResult extends TorrentResult {
  description: string | null;
  hash: string | null;
  updated_at: string;
  type: 'movie' | 'tv' | null;
  tmdb_id: number | null;
}

export type OrderBy = 'uploaded_at' | 'seeders' | 'downloads';
export type PerPage = '25' | '50' | '100';

export interface SearchParams {
  page?: number;
  q?: string;
  category_id?: number[];
  order_by?: OrderBy;
  per_page?: PerPage;
  season?: number;
  episode?: number;
  type?: 'movie' | 'tv';
  tmdb_id?: number;
}

export interface Category {
  id: number;
  name: string;
  parent?: string;
}
