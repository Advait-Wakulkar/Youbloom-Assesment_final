import { useNavigate } from 'react-router-dom';

const ItemCard = ({ item, type = 'user' }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/detail/${item.id}?type=${type}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 cursor-pointer border border-gray-200 hover:border-blue-300"
    >
      {type === 'user' ? (
        <div>
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              {item.name?.charAt(0)?.toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">@{item.username}</p>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {item.email}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21L6.3 11.043a11.021 11.021 0 00-.302 4.233A11.021 11.021 0 009.267 19.7l1.646-3.924a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V21a2 2 0 01-2 2h-1C9.716 23 2 15.284 2 7V6a2 2 0 012-2z" />
              </svg>
              {item.phone}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
              {item.website}
            </div>
            
            {item.company && (
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {item.company.name}
              </div>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-3">
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{item.title}</h3>
            <p className="text-sm text-blue-600 mt-1">Post #{item.id}</p>
          </div>
          
          <p className="text-gray-600 text-sm line-clamp-3 mb-3">{item.body}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>User ID: {item.userId}</span>
            <span className="bg-gray-100 px-2 py-1 rounded">Article</span>
          </div>
        </div>
      )}
      
      <div className="mt-4 flex items-center justify-end">
        <span className="text-blue-600 text-sm font-medium hover:text-blue-700">
          View Details →
        </span>
      </div>
    </div>
  );
};

export default ItemCard;