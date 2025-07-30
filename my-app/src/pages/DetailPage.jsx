import { useState, useEffect } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { getUserById, getPostById, getCommentsByPostId, getPostsByUserId } from '../services/api';

const DetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get('type') || 'user'; // Get type from URL params
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [loadingExtra, setLoadingExtra] = useState(false);

  // Load main item data when component mounts
  useEffect(() => {
    loadItemData();
  }, [id, type]);

  // Load additional data after main item loads
  useEffect(() => {
    if (item && type === 'post') {
      loadComments();
    } else if (item && type === 'user') {
      loadUserPosts();
    }
  }, [item, type]);

  const loadItemData = async () => {
    console.log(`Loading ${type} details for id: ${id}`);
    setLoading(true);
    setError(null);
    
    try {
      let data;
      if (type === 'user') {
        data = await getUserById(id);
      } else {
        data = await getPostById(id);
      }
      
      console.log(`${type} data loaded:`, data);
      setItem(data);
    } catch (err) {
      console.error(`Error loading ${type}:`, err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadComments = async () => {
    console.log(`Loading comments for post ${id}`);
    setLoadingExtra(true);
    try {
      const commentsData = await getCommentsByPostId(id);
      console.log(`Loaded ${commentsData.length} comments`);
      setComments(commentsData);
    } catch (err) {
      console.error('Error loading comments:', err);
      // Don't show error for comments, just log it
    } finally {
      setLoadingExtra(false);
    }
  };

  const loadUserPosts = async () => {
    console.log(`Loading posts by user ${id}`);
    setLoadingExtra(true);
    try {
      const postsData = await getPostsByUserId(id);
      console.log(`Loaded ${postsData.length} posts by this user`);
      setUserPosts(postsData);
    } catch (err) {
      console.error('Error loading user posts:', err);
      // Don't show error for posts, just log it
    } finally {
      setLoadingExtra(false);
    }
  };

  const handleBackClick = () => {
    console.log('Going back to main page');
    navigate('/main');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading {type} details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            <p className="font-medium">Error loading {type} details</p>
            <p className="text-sm mt-1">{error}</p>
            <button
              onClick={handleBackClick}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
            >
              Back to Main Page
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">No {type} found</p>
          <button
            onClick={handleBackClick}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Back to Main Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={handleBackClick}
              className="flex items-center text-gray-600 hover:text-gray-900 transition duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Main Page
            </button>
            <h1 className="text-lg font-semibold text-gray-900 capitalize">
              {type} Details
            </h1>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {type === 'user' ? (
          // User Details
          <div className="space-y-6">
            {/* User Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  {item.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{item.name}</h2>
                  <p className="text-gray-600">@{item.username}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span className="text-gray-700">{item.email}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.3 11.043a11.021 11.021 0 00-.302 4.233A11.021 11.021 0 009.267 19.7l1.646-3.924a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V21a2 2 0 01-2 2h-1C9.716 23 2 15.284 2 7V6a2 2 0 012-2z" />
                      </svg>
                      <span className="text-gray-700">{item.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                      </svg>
                      <span className="text-gray-700">{item.website}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Address</h3>
                  <div className="text-gray-700">
                    <p>{item.address?.street} {item.address?.suite}</p>
                    <p>{item.address?.city}, {item.address?.zipcode}</p>
                    {item.address?.geo && (
                      <p className="text-sm text-gray-500 mt-2">
                        Coordinates: {item.address.geo.lat}, {item.address.geo.lng}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {item.company && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Company</h3>
                  <div>
                    <p className="text-xl font-medium text-gray-900">{item.company.name}</p>
                    <p className="text-gray-600 italic">"{item.company.catchPhrase}"</p>
                    <p className="text-gray-700 mt-2">{item.company.bs}</p>
                  </div>
                </div>
              )}
            </div>

            {/* User Posts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Posts by {item.name} ({userPosts.length})
              </h3>
              
              {loadingExtra ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              ) : userPosts.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {userPosts.map((post) => (
                    <div key={post.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <h4 className="font-medium text-gray-900 mb-2">{post.title}</h4>
                      <p className="text-gray-600 text-sm">{post.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No posts found for this user.</p>
              )}
            </div>
          </div>
        ) : (
          // Post Details
          <div className="space-y-6">
            {/* Post Content */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-2">
                  Post #{item.id}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{item.title}</h2>
                <p className="text-gray-600 text-sm">By User ID: {item.userId}</p>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed">{item.body}</p>
              </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Comments ({comments.length})
              </h3>
              
              {loadingExtra ? (
                <div className="text-center py-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
                </div>
              ) : comments.length > 0 ? (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{comment.name}</h4>
                        <span className="text-sm text-gray-500">{comment.email}</span>
                      </div>
                      <p className="text-gray-700 text-sm">{comment.body}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No comments found for this post.</p>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default DetailPage;