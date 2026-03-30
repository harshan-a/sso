# SSO Authentication System

A full-stack Single Sign-On (SSO) authentication system built with React (frontend) and Express.js (backend), featuring user registration, login, password management, OTP verification, and JWT-based authentication with JWKS support.

## Project Structure

This project is organized into two main components:

- **client/**: React-based frontend application
- **server/**: Express.js backend API server

## Features

- User registration and login
- Password change functionality
- OTP (One-Time Password) verification via email
- JWKS (JSON Web Key Set) endpoint for SSO integration
- Email validation
- Secure password hashing with bcrypt
- MongoDB database integration
- CORS support for cross-origin requests
- Swagger API documentation

## Technology Stack

### Frontend (Client)

- React 19 with TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- Axios for HTTP requests
- React Router for navigation
- ESLint for code linting

### Backend (Server)

- Node.js with Express.js
- TypeScript
- MongoDB with Mongoose
- JWT with RSA-256 signing
- jose for JWT and JWKS management
- bcryptjs for password hashing
- Nodemailer for email sending
- Swagger UI for API documentation
- Morgan for request logging

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd sso
   ```

2. Install dependencies for both client and server:

   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

### Environment Setup

Create a `.env` file in the `server/` directory with the following variables:

```env
PORT=5000
MONGO_CONNECTION_URL=--url--
PRIMARY_GMAIL=your-email@gmail.com
PRIMARY_GMAIL_APP_PASS=your-app-specific-password
```

**Note**:

- The `.env` file is gitignored for security. Create it manually with your actual credentials.
- RSA keys for JWT signing are stored in `server/keys/` directory and are also gitignored. Generate your own key pair as described in the server README.

### Running the Application

1. Start the backend server:

   ```bash
   cd server
   npm run dev
   ```

2. In a new terminal, start the frontend client:

   ```bash
   cd client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

## API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when the server is running.

## Available Scripts

### Client Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Server Scripts

- `npm run dev` - Start development server with nodemon
- `npm run build` - Compile TypeScript
- `npm run start` - Start production server

## Project Architecture

### Client Architecture

- **Components**: Reusable UI components (Header, PasswordBar, EmailValidation)
- **Pages**: Authentication forms (Login, Signup, ChangePassword, etc.)
- **Context**: Global state management (Loading, ClientData)
- **APIs**: Axios-based API client for backend communication

### Server Architecture

- **Controllers**: Business logic for auth, OTP, and user operations
- **Models**: MongoDB schemas (User, OTP, AuthorizationCode)
- **Routers**: API route definitions
- **Middlewares**: Authentication, error handling, and CORS
- **Utils**: Helper functions and configurations

## Security Features

- Password hashing with bcrypt
- JWKS endpoint for secure key distribution
- CORS configuration
- Input validation and error handling
- Secure cookie handling

## Security Considerations

- **Environment Variables**: The `.env` file is gitignored to prevent credential exposure
- **RSA Keys**: Private keys are gitignored and must be generated locally
- **Dependencies**: Both client and server have their own `.gitignore` files for proper exclusion of sensitive files

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request
