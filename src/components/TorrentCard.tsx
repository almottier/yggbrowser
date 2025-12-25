import { TorrentResult } from '../types';
import { formatBytes } from '../api';
import { CATEGORIES, API_BASE_URL } from '../constants';

interface TorrentCardProps {
  torrent: TorrentResult;
  passkey: string;
}

export function TorrentCard({ torrent, passkey }: TorrentCardProps) {
  const category = CATEGORIES.find(c => c.id === torrent.category_id);
  const uploadDate = new Date(torrent.uploaded_at);
  const now = new Date();
  const diffMs = now.getTime() - uploadDate.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  // Format time in French (like YGG: "20 heures", "1 jour")
  let timeAgo = '';
  if (diffMins < 1) {
    timeAgo = 'maintenant';
  } else if (diffMins < 60) {
    timeAgo = `${diffMins} min`;
  } else if (diffMins < 1440) {
    const hours = Math.floor(diffMins / 60);
    timeAgo = hours === 1 ? '1 heure' : `${hours} heures`;
  } else if (diffMins < 43200) {
    const days = Math.floor(diffMins / 1440);
    timeAgo = days === 1 ? '1 jour' : `${days} jours`;
  } else if (diffMins < 525600) {
    const months = Math.floor(diffMins / 43200);
    timeAgo = months === 1 ? '1 mois' : `${months} mois`;
  } else {
    const years = Math.floor(diffMins / 525600);
    timeAgo = years === 1 ? '1 an' : `${years} ans`;
  }

  const downloadUrl = passkey
    ? `${API_BASE_URL}/torrent/${torrent.id}/download?passkey=${passkey}`
    : '';

  // Get category badge text and color
  const getCategoryBadge = () => {
    if (!category) return { label: 'AUTRE', color: 'bg-gray-600' };

    // Map categories to badge labels and colors
    if (category.parent === 'Film/Vidéo') {
      const label = category.name === 'Film' ? 'FILM' :
                   category.name === 'Série TV' ? 'SÉRIE' :
                   category.name === 'Animation' ? 'ANIM' : 'VIDÉO';
      return { label, color: 'bg-blue-600' };
    }
    if (category.parent === 'Audio') return { label: 'AUDIO', color: 'bg-purple-600' };
    if (category.parent === 'Application') return { label: 'APP', color: 'bg-green-600' };
    if (category.parent === 'Jeu vidéo') return { label: 'JEU', color: 'bg-orange-600' };
    if (category.parent === 'eBook') return { label: 'eBOOK', color: 'bg-amber-600' };
    return { label: 'AUTRE', color: 'bg-gray-600' };
  };

  const badge = getCategoryBadge();

  return (
    <tr className="border-b border-gray-800 hover:bg-[#222] transition-colors">
      {/* TYPE Column */}
      <td className="py-3 px-4">
        <span className={`inline-block px-2 py-1 text-xs font-bold text-white ${badge.color} rounded`}>
          {badge.label}
        </span>
      </td>

      {/* NOM Column */}
      <td className="py-3 px-4">
        <a
          href={torrent.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-white hover:text-blue-400 transition-colors"
        >
          {torrent.title}
        </a>
      </td>

      {/* AGE Column */}
      <td className="py-3 px-4 text-sm text-gray-300 text-center whitespace-nowrap">
        <div className="flex items-center justify-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
          </svg>
          {timeAgo}
        </div>
      </td>

      {/* TAILLE Column */}
      <td className="py-3 px-4 text-sm text-gray-300 text-right whitespace-nowrap">
        {formatBytes(torrent.size)}
      </td>

      {/* COMPL Column */}
      <td className="py-3 px-4 text-sm text-gray-300 text-center">
        {torrent.downloads || 0}
      </td>

      {/* SEED Column */}
      <td className="py-3 px-4 text-sm text-green-500 font-semibold text-center">
        {torrent.seeders}
      </td>

      {/* LEECH Column */}
      <td className="py-3 px-4 text-sm text-red-500 font-semibold text-center">
        {torrent.leechers}
      </td>

      {/* DL Column */}
      <td className="py-3 px-4 text-center">
        {passkey ? (
          <a
            href={downloadUrl}
            download
            className="inline-flex items-center justify-center w-8 h-8 text-blue-400 hover:text-blue-300 hover:bg-[#333] rounded transition-colors"
            title="Télécharger le torrent"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        ) : (
          <span className="text-xs text-gray-600" title="Passkey requise">-</span>
        )}
      </td>
    </tr>
  );
}
