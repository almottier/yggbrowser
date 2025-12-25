import { useState, useEffect } from 'react';

interface PasskeyInputProps {
  onPasskeyChange: (passkey: string) => void;
}

export function PasskeyInput({ onPasskeyChange }: PasskeyInputProps) {
  const [passkey, setPasskey] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('ygg_passkey');
    if (saved) {
      setPasskey(saved);
      onPasskeyChange(saved);
    }
  }, [onPasskeyChange]);

  const handleSave = () => {
    if (passkey.length === 32 && /^[a-zA-Z0-9]{32}$/.test(passkey)) {
      localStorage.setItem('ygg_passkey', passkey);
      onPasskeyChange(passkey);
    }
  };

  const handleClear = () => {
    setPasskey('');
    localStorage.removeItem('ygg_passkey');
    onPasskeyChange('');
  };

  return (
    <div className="flex items-center gap-2">
      <div className="relative">
        <input
          type={isVisible ? 'text' : 'password'}
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          placeholder="Passkey YGG (32 caractères)"
          className="px-3 py-2 text-sm bg-[#1a1a1a] border border-gray-700 text-gray-200 placeholder-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-96"
          maxLength={32}
        />
        <button
          type="button"
          onClick={() => setIsVisible(!isVisible)}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
          title={isVisible ? 'Masquer' : 'Afficher'}
        >
          {isVisible ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
      <button
        onClick={handleSave}
        className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        title="Sauvegarder"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </button>
      {passkey && (
        <button
          onClick={handleClear}
          className="p-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
          title="Effacer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  );
}
