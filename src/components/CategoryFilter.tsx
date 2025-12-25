import { useState } from 'react';
import { CATEGORIES, CATEGORY_GROUPS } from '../constants';

interface CategoryFilterProps {
  selectedCategories: number[];
  onCategoryChange: (categories: number[]) => void;
}

export function CategoryFilter({ selectedCategories, onCategoryChange }: CategoryFilterProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCategory = (categoryId: number) => {
    if (selectedCategories.includes(categoryId)) {
      onCategoryChange(selectedCategories.filter(id => id !== categoryId));
    } else {
      onCategoryChange([...selectedCategories, categoryId]);
    }
  };

  const clearAll = () => {
    onCategoryChange([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 text-sm bg-[#1a1a1a] border border-gray-700 text-gray-300 rounded-lg hover:bg-[#222] flex items-center gap-2"
      >
        <span>Catégories</span>
        {selectedCategories.length > 0 && (
          <span className="px-1.5 py-0.5 bg-blue-600 text-white text-xs rounded-full">
            {selectedCategories.length}
          </span>
        )}
        <span className="text-gray-400">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 left-0 bg-[#1a1a1a] border border-gray-700 rounded-lg shadow-lg z-10 min-w-[300px] max-h-[500px] overflow-auto">
          <div className="p-3 border-b border-gray-700 flex justify-between items-center sticky top-0 bg-[#1a1a1a]">
            <span className="text-sm font-medium text-gray-300">Filtrer par catégorie</span>
            {selectedCategories.length > 0 && (
              <button
                onClick={clearAll}
                className="text-xs text-blue-400 hover:text-blue-300"
              >
                Tout effacer
              </button>
            )}
          </div>

          {CATEGORY_GROUPS.map(group => {
            const groupCategories = CATEGORIES.filter(c => c.parent === group);
            return (
              <div key={group} className="border-b border-gray-800 last:border-b-0">
                <div className="px-3 py-2 bg-[#0d0d0d] text-xs font-semibold text-gray-400">
                  {group}
                </div>
                {groupCategories.map(category => (
                  <label
                    key={category.id}
                    className="flex items-center gap-2 px-3 py-2 hover:bg-[#222] cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => toggleCategory(category.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">{category.name}</span>
                  </label>
                ))}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
