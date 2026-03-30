# SSO Client - Frontend Application

The frontend component of the SSO Authentication System, built with React and TypeScript.

## Overview

This is a React-based single-page application that provides the user interface for authentication operations including login, signup, password management, and OTP verification. It communicates with the backend API server to handle user authentication flows.

## Features

- User-friendly authentication forms
- Responsive design with Tailwind CSS
- Real-time form validation
- Loading states and error handling
- OTP verification flow
- Password strength indicator
- Email validation
- Client-side routing with React Router

## Technology Stack

- **React 19**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe JavaScript
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client for API requests
- **React Router**: Client-side routing
- **ESLint**: Code linting and formatting

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Application header
│   ├── PasswordBar.tsx # Password strength indicator
│   └── EmailValidation.tsx # Email validation component
├── pages/              # Page components
│   ├── Form.tsx        # Main authentication form
│   ├── Login.tsx       # Login page
│   ├── Signup.tsx      # Registration page
│   ├── ChangePassword.tsx # Password change page
│   ├── ForgotPassword.tsx # Password recovery page
│   └── VerifyOTP.tsx   # OTP verification page
├── context/            # React context providers
│   ├── Loading.tsx     # Loading state management
│   └── ClientData.tsx  # Client data context
├── apis/               # API client functions
│   ├── auth.ts         # Authentication API calls
│   ├── axios.ts        # Axios configuration
│   └── otp.ts          # OTP-related API calls
├── assets/             # Static assets
│   ├── icons/          # Icon files
│   └── logos/          # Logo files
├── types.d.ts          # TypeScript type definitions
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

### Code Quality

Run ESLint to check code quality:

```bash
npm run lint
```

## Configuration

The client application expects the backend API to be running. Update the API base URL in `src/apis/axios.ts` if needed:

```typescript
const api = axios.create({
  baseURL: "http://localhost:5000/api/v1", // Update this URL if your server runs on a different port
  withCredentials: true,
})
```

## Key Components

### Authentication Flow

1. **Form Component**: Main container that manages the authentication state and renders appropriate forms
2. **Login/Signup**: User credential input forms
3. **OTP Verification**: Email-based OTP verification
4. **Password Management**: Change password and forgot password flows

### Context Providers

- **LoadingProvider**: Manages global loading states
- **ClientDataProvider**: Manages client-side data and authentication state

### API Integration

The client uses Axios for HTTP requests with the following API endpoints:

- `POST /auth/login` - User login
- `POST /auth/signup` - User registration
- `POST /auth/change-password` - Password change
- `POST /otp/send` - Send OTP
- `POST /otp/verify` - Verify OTP
- `GET /users/check` - Check email existence

## Styling

The application uses Tailwind CSS for styling with custom CSS in `index.css` and component-specific styles in `App.css`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Development Notes

- The application uses React 19's new features including the React Compiler
- TypeScript is configured with strict type checking
- ESLint rules are customized for React and TypeScript best practices
- The build process includes TypeScript compilation and asset optimization

## Troubleshooting

### Common Issues

1. **API Connection Errors**: Ensure the backend server is running on the correct port
2. **CORS Errors**: Check CORS configuration in the backend
3. **Build Errors**: Clear node_modules and reinstall dependencies

### Development Tips

- Use React Developer Tools for debugging
- Check the browser console for API errors
- Use the Network tab to monitor API requests</content>
  <parameter name="oldString">
