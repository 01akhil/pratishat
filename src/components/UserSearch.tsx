'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

let debounceTimer: ReturnType<typeof setTimeout>;

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const containerRef = useRef(null);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/search-users?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data.users || []);
    } catch (err) {
      console.error('Search failed', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
      handleSearch(query);
    }, 400);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  const handleSelectUser = (userId: string) => {
    router.push(`/user/${userId}`);
  };

  return (
    <div className="relative w-full " ref={containerRef}>
      {/* Sticky Search Bar like Instagram */}
      <div className="sticky top-4 z-50 bg-white rounded shadow-sm">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="w-full p-3 pl-10 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-gray-400"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      {/* Search Results Dropdown */}
      {query && results.length > 0 && (
        <ul className="absolute w-full mt-2 bg-white border border-gray-200 rounded shadow-md z-40">
          {results.map((user) => (
            <li
              key={user._id}
              onClick={() => handleSelectUser(user._id)}
              className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              <img
                src={user.profile_image_url || '/default-avatar.png'}
                alt={user.userName}
                className="w-8 h-8 rounded-full object-cover mr-3"
              />
              <div>
                <p className="font-medium text-sm">{user.userName}</p>
                <p className="text-xs text-gray-500">{user.email}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      {query && loading && (
        <div className="absolute w-full mt-2 p-2 bg-white border border-gray-200 rounded shadow-md z-40 text-sm text-gray-500">
          Searching...
        </div>
      )}
    </div>
  );
};

export default UserSearch;
