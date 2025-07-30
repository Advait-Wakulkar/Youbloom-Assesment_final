import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getUsers, getPosts } from '../services/api';
import SearchBar from '../components/SearchBar';
import ItemList from '../components/ItemList';

const MainPage = () => {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dataType, setDataType] = useState('users'); // 'users' or 'posts'

  // Load data when component mounts or data type changes
  useEffect(() => {
    loadData();
  }, [dataType]);

  const loadData = async () => {
    console.log(`Loading ${dataType} data...`);
    setLoading(true);
    setError(null);
    
    try {
      let data;
      if (dataType === 'users') {
        data = await getUsers();
      } else {
        data = await getPosts();
      }
      
      console.log(`Loaded ${data.length} ${dataType}`);
      setItems(data);
      setFilteredItems(data); // Initially show all items
    } catch (err) {
      console.error('Error loading data:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle search functionality
  const handleSearch = (searchTerm) => {
    console.log('Searching for:', searchTerm);
    
    if (!searchTerm.trim()) {
      // If search is empty, show all items
      setFilteredItems(items);
      return;
    }

    // Filter items based on search term
    const filtered = items.filter((item) => {
      if (dataType === 'users') {
        // Search in name, username, email
        return (
          item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
      } else {
        // Search in title and body for posts
        return (
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.body.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
    });

    console.log(`Found ${filtered.length} matching items`);
    setFilteredItems(filtered);
  };

  const handleLogout = () => {
    console.log('User clicking logout...');
    logout();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User info */}
              <div className="text-sm text-gray-600">
                Welcome, {user?.firstName} {user?.lastName}
              </div>
              
              {/* Logout button */}
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Data type toggle */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
            <button
              onClick={() => setDataType('users')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                dataType === 'users'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Users ({items.length})
            </button>
            <button
              onClick={() => setDataType('posts')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition duration-200 ${
                dataType === 'posts'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Posts ({items.length})
            </button>
          </div>
        </div>

        {/* Search bar */}
        <SearchBar
          onSearch={handleSearch}
          placeholder={`Search ${dataType}...`}
        />

        {/* Results count */}
        {!loading && !error && (
          <div className="mb-4 text-sm text-gray-600">
            Showing {filteredItems.length} of {items.length} {dataType}
          </div>
        )}

        {/* Items list */}
        <ItemList
          items={filteredItems}
          loading={loading}
          error={error}
          type={dataType === 'users' ? 'user' : 'post'}
        />
      </main>
    </div>
  );
};

export default MainPage;