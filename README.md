# React Demo App - Technical Interview Task

A modern React web application built with Vite, featuring user authentication, data management, and clean UI design.

## 🚀 Features

- **User Authentication** - Login system with form validation
- **Data Display** - Browse users and posts from JSONPlaceholder API
- **Search Functionality** - Real-time search with filtering
- **Detail Views** - Comprehensive user and post detail pages
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **State Management** - React Context API for authentication
- **Persistent Sessions** - localStorage integration
- **Unit Testing** - Comprehensive test coverage

## 🛠️ Tech Stack

- **Frontend**: React 19, React Router DOM 7
- **Styling**: Tailwind CSS 4
- **HTTP Client**: Axios
- **Testing**: Vitest, React Testing Library
- **Build Tool**: Vite 7
- **API**: JSONPlaceholder (https://jsonplaceholder.typicode.com)

## 📱 Application Pages

### 1. Login Page
- Multi-field form (First Name, Last Name, Email, Phone Number)
- Real-time validation with error messages
- Phone number format validation (+254 country code)
- Loading states and form submission handling

### 2. Main Page (Dashboard)
- Toggle between Users and Posts data
- Real-time search functionality
- Results counter and filtering
- Clean card-based layout
- User authentication status display
- Logout functionality

### 3. Detail Page
- **User Details**: Contact info, address, company details, user posts
- **Post Details**: Full content, author info, comments section
- Navigation back to main page
- Dynamic content loading

## 🔧 Project Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd my-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:5173
   ```

## 🧪 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run tests
npm test

# Run tests with UI
npm test:ui

# Run tests once (CI mode)
npm test:run

# Lint code
npm run lint
```

## 🔐 Demo Credentials

The application uses mock authentication. To login, use:

- **First Name**: Any name (minimum 2 characters)
- **Last Name**: Any name (minimum 2 characters)  
- **Email**: Any valid email format
- **Phone**: Any valid number starting with +254 (e.g., +254712345678)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── SearchBar.jsx   # Search functionality
│   ├── ItemCard.jsx    # Card component for users/posts
│   └── ItemList.jsx    # List display with loading states
├── pages/              # Main application pages
│   ├── LoginPage.jsx   # Authentication page
│   ├── MainPage.jsx    # Dashboard with data display
│   └── DetailPage.jsx  # Detail view for users/posts
├── context/            # React Context for state management
│   └── AuthContext.jsx # Authentication state and logic
├── services/           # API integration
│   └── api.js         # Axios setup and API endpoints
├── utils/             # Utility functions
│   └── validation.js  # Form validation logic
├── __tests__/         # Unit tests
│   └── LoginPage.test.jsx
└── App.jsx            # Main app component with routing
```

## 🧪 Testing

The project includes comprehensive unit tests using Vitest and React Testing Library:

- Form rendering validation
- User input handling
- Form validation logic
- Phone number format validation
- Error state management

Run tests with:
```bash
npm test
```

## 🎨 UI/UX Features

- **Modern Design**: Clean, professional interface with Tailwind CSS
- **Loading States**: Skeleton loaders and spinners for better UX
- **Error Handling**: Comprehensive error states and user feedback
- **Responsive Layout**: Works seamlessly on desktop and mobile
- **Accessibility**: Proper ARIA labels and semantic HTML
- **Animation**: Smooth transitions and hover effects

## 🔄 State Management

The application uses React Context API for:
- User authentication state
- Session persistence with localStorage
- Protected route access control
- User profile data management

## 🌐 API Integration

- **Base URL**: https://jsonplaceholder.typicode.com
- **Endpoints Used**:
  - `/users` - User list and details
  - `/posts` - Post list and details
  - `/comments` - Post comments
- **Error Handling**: Comprehensive error states and user feedback
- **Loading States**: Proper loading indicators during API calls

## 🚀 Deployment

To build for production:

```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 📝 Assignment Requirements Completed

✅ **Login Page** with phone number validation  
✅ **Main Page** with list view and search  
✅ **Detail Page** with comprehensive information  
✅ **React Hooks** and functional components  
✅ **Context API** for state management  
✅ **API Integration** with JSONPlaceholder  
✅ **Responsive UI** with Tailwind CSS  
✅ **Unit Testing** with Vitest and React Testing Library  
✅ **Clean Code** with modular file structure  
✅ **Error Handling** and loading states  
✅ **localStorage** for session persistence  

## 👨‍💻 Development Notes

This project was built following React best practices:
- Functional components with hooks
- Proper error boundaries and loading states
- Clean separation of concerns
- Comprehensive validation and error handling
- Mobile-first responsive design
- Accessibility considerations

## 🐛 Known Issues

None currently. The application is fully functional and meets all requirements.

## 📄 License

This project is created for technical interview purposes.
