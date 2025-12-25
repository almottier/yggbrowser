import { API_BASE_URL } from './constants';
import { SearchParams, TorrentResult, DetailTorrentResult } from './types';

export async function searchTorrents(params: SearchParams = {}): Promise<TorrentResult[]> {
  const queryParams = new URLSearchParams();

  if (params.page) queryParams.append('page', params.page.toString());
  if (params.q) queryParams.append('q', params.q);
  if (params.category_id?.length) {
    params.category_id.forEach(id => queryParams.append('category_id', id.toString()));
  }
  if (params.order_by) queryParams.append('order_by', params.order_by);
  if (params.per_page) queryParams.append('per_page', params.per_page);
  if (params.season) queryParams.append('season', params.season.toString());
  if (params.episode) queryParams.append('episode', params.episode.toString());
  if (params.type) queryParams.append('type', params.type);
  if (params.tmdb_id) queryParams.append('tmdb_id', params.tmdb_id.toString());

  const url = `${API_BASE_URL}/torrents${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export async function getTorrentDetails(torrentId: number): Promise<DetailTorrentResult> {
  const url = `${API_BASE_URL}/torrent/${torrentId}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 30) return `${diffDays}d ago`;

  return date.toLocaleDateString();
}
