import { useState, useEffect } from 'react';
import { searchTorrents } from './api';
import { TorrentResult, OrderBy } from './types';
import { SearchBar } from './components/SearchBar';
import { CategoryFilter } from './components/CategoryFilter';
import { TorrentCard } from './components/TorrentCard';
import { Pagination } from './components/Pagination';
import { PasskeyInput } from './components/PasskeyInput';

function App() {
  const [torrents, setTorrents] = useState<TorrentResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [orderBy, setOrderBy] = useState<OrderBy>('uploaded_at');
  const [hasMore, setHasMore] = useState(true);
  const [passkey, setPasskey] = useState('');

  useEffect(() => {
    const fetchTorrents = async () => {
      setLoading(true);
      setError(null);

      try {
        const results = await searchTorrents({
          q: searchQuery || undefined,
          category_id: selectedCategories.length > 0 ? selectedCategories : undefined,
          page: currentPage,
          order_by: orderBy,
          per_page: '50',
        });

        setTorrents(results);
        setHasMore(results.length === 50);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Échec du chargement des torrents');
        setTorrents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTorrents();
  }, [searchQuery, selectedCategories, currentPage, orderBy]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleCategoryChange = (categories: number[]) => {
    setSelectedCategories(categories);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrderChange = (newOrder: OrderBy) => {
    setOrderBy(newOrder);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#0d0d0d]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">YggBrowser</h1>
          <p className="text-gray-400 text-sm">Recherchez et téléchargez les torrents de YggTorrent via YGG-API</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

          <div className="flex items-center gap-3 flex-wrap">
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Trier par :</span>
              <select
                value={orderBy}
                onChange={(e) => handleOrderChange(e.target.value as OrderBy)}
                className="px-3 py-2 text-sm bg-[#1a1a1a] border border-gray-700 text-gray-300 rounded-lg hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="uploaded_at">Récents</option>
                <option value="seeders">Seeders</option>
                <option value="downloads">Téléchargements</option>
              </select>
            </div>

            <PasskeyInput onPasskeyChange={setPasskey} />
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-sm text-gray-400">Chargement des torrents...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-900/20 border border-red-800 rounded-lg p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Results */}
        {!loading && !error && (
          <>
            {torrents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-400">Aucun torrent trouvé</p>
                <p className="text-sm text-gray-500 mt-2">Essayez d'ajuster votre recherche ou vos filtres</p>
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-gray-400">
                  {torrents.length} torrent{torrents.length !== 1 ? 's' : ''}
                  {searchQuery && ` correspondant à "${searchQuery}"`}
                </div>

                <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg overflow-hidden mb-8">
                  <table className="w-full">
                    <thead className="bg-[#0d0d0d] border-b border-gray-800">
                      <tr>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="py-3 px-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Nom
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                          Age
                        </th>
                        <th className="py-3 px-4 text-right text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Taille
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Compl.
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Seed
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          Leech
                        </th>
                        <th className="py-3 px-4 text-center text-xs font-semibold text-gray-400 uppercase tracking-wider">
                          DL
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {torrents.map((torrent) => (
                        <TorrentCard key={torrent.id} torrent={torrent} passkey={passkey} />
                      ))}
                    </tbody>
                  </table>
                </div>

                <Pagination
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
                  hasMore={hasMore}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
