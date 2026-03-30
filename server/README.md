# SSO Server - Backend API

The backend component of the SSO Authentication System, built with Express.js and TypeScript.

## Overview

This is a RESTful API server that handles authentication, user management, OTP verification, and JWT token operations. It provides secure endpoints for user registration, login, password management, and supports SSO integration through JWKS.

## Features

- RESTful API endpoints for authentication
- JWT token-based authentication
- JWKS (JSON Web Key Set) endpoint for SSO
- OTP verification via email
- Secure password hashing
- MongoDB database integration
- Swagger API documentation
- Error handling and logging
- CORS support

## Technology Stack

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **TypeScript**: Type-safe JavaScript
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **JWT**: JSON Web Tokens for authentication (RSA-256 signed)
- **jose**: JWT and JWKS utilities
- **bcryptjs**: Password hashing
- **Nodemailer**: Email sending
- **Swagger UI**: API documentation
- **Morgan**: HTTP request logger

## Project Structure

```
src/
├── config/             # Configuration files
│   └── mongodb.ts      # Database connection
├── controllers/        # Route controllers
│   ├── authController.ts    # Authentication logic
│   ├── otpController.ts     # OTP operations
│   ├── userController.ts    # User management
│   └── keysController.ts    # JWKS endpoint
├── models/             # MongoDB schemas
│   ├── User.ts              # User model
│   ├── Otp.ts               # OTP model
│   └── AuthorizationCode.ts # Auth code model
├── routers/            # API route definitions
│   ├── authRouter.ts        # Auth routes
│   ├── otpRouter.ts         # OTP routes
│   ├── userRouter.ts        # User routes
│   └── index.ts             # Route exports
├── middlewares/        # Express middlewares
│   ├── authMiddleware.ts    # Authentication middleware
│   ├── errorHandling.ts     # Error handling
│   └── notFound.ts          # 404 handler
├── errors/             # Custom error classes
│   ├── BadRequest.ts
│   ├── Unauthorized.ts
│   ├── Forbidden.ts
│   ├── NotFound.ts
│   ├── InternalServer.ts
│   └── CustomError.ts
├── utils/              # Utility functions
├── app.ts              # Express app configuration
├── index.ts            # Server entry point
└── express.d.ts        # TypeScript declarations
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Navigate to the server directory:

   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Configuration

Create a `.env` file in the server root directory:

```env
# Server Configuration
PORT=5000

# Database
MONGO_CONNECTION_URL=mongodb+srv://username:password@cluster.mongodb.net/db?appName=AppName

# CORS Configuration
CLIENT_BASE_URLS=http://localhost:5173

# Email Configuration (for OTP)
PRIMARY_GMAIL=your-email@gmail.com
PRIMARY_GMAIL_APP_PASS=your-app-specific-password
```

**Note**: The `.env` file is gitignored for security. Create it manually with your actual credentials.

### Database Setup

Ensure MongoDB is running and accessible. The application will create collections automatically.

### Running the Server

#### Development Mode

```bash
npm run dev
```

This starts the server with nodemon for automatic restarts on file changes.

#### Production Mode

```bash
npm run build
npm start
```

## API Endpoints

### Authentication Routes (`/api/v1/auth`)

- `POST /login` - User login
- `POST /signup` - User registration
- `POST /change-password` - Change password (requires auth)
- `POST /token` - Token refresh/validation

### OTP Routes (`/api/v1/otp`)

- `POST /send` - Send OTP to email
- `POST /verify` - Verify OTP code

### User Routes (`/api/v1/users`)

- `GET /check` - Check if email exists

### JWKS Endpoint

- `GET /.well-known/jwks.json` - JSON Web Key Set for SSO

### API Documentation

- `GET /api-docs` - Swagger UI documentation

## API Testing

The project includes a `req.http` file with example API requests for testing with VS Code REST Client extension or similar HTTP testing tools.

## Authentication Flow

1. **Registration**: User provides email and password
2. **OTP Verification**: System sends OTP to email for verification
3. **Login**: User provides credentials, receives JWT token
4. **Protected Routes**: JWT token required for authenticated endpoints

## Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **JWT Tokens**: RSA-256 signed tokens for enhanced security
- **JWKS**: Public key distribution for SSO clients
- **CORS**: Configured for allowed origins
- **Input Validation**: Request validation and sanitization
- **Error Handling**: Secure error responses without sensitive data

## RSA Key Configuration

The application uses RSA-256 keys for JWT signing and JWKS. The keys are stored in the `keys/` directory:

- `keys/private.pem` - Private key for signing JWT tokens
- `keys/public.pem` - Public key for JWKS endpoint

**Important**: The `keys/` directory is gitignored for security reasons. You must generate your own RSA key pair.

### Generating RSA Keys

Create the `keys/` directory and generate new keys:

```bash
mkdir keys
# Generate private key
openssl genpkey -algorithm RSA -out keys/private.pem -pkcs8

# Generate public key from private key
openssl rsa -pubout -in keys/private.pem -out keys/public.pem
```

**Security Note**: Never commit private keys to version control. Keep them secure and never share them.

## Database Models

### User Model

- `email`: Unique email address
- `password`: Hashed password
- `isVerified`: Email verification status
- `createdAt`: Account creation timestamp

### OTP Model

- `email`: Associated email
- `otp`: One-time password code
- `expiresAt`: OTP expiration time

### AuthorizationCode Model

- `code`: Authorization code
- `clientId`: Client identifier
- `userId`: User identifier
- `expiresAt`: Expiration timestamp

## Middleware

- **Authentication Middleware**: Validates JWT tokens
- **Error Handling**: Centralized error processing
- **CORS**: Cross-origin resource sharing
- **Logging**: Request logging with Morgan
- **Body Parser**: JSON and cookie parsing

## Development

### Scripts

- `npm run dev` - Development with nodemon
- `npm run build` - TypeScript compilation
- `npm start` - Production server

### Code Quality

- TypeScript strict mode enabled
- ESLint configuration for code standards
- Prettier for code formatting

### Testing

Add tests in a `tests/` directory and configure test scripts in `package.json`.

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGO_CONNECTION_URL=mongodb+srv://...
CLIENT_BASE_URLS=https://yourdomain.com
PRIMARY_GMAIL=production-email@domain.com
PRIMARY_GMAIL_APP_PASS=production-email-password
```

### Build Process

```bash
npm run build
npm start
```

## Monitoring and Logging

- Morgan logs all HTTP requests
- Error handling middleware logs errors
- Console logging for database connections and server status

## Troubleshooting

### Common Issues

1. **Database Connection Failed**
   - Check MongoDB is running
   - Verify connection string in `.env`

2. **JWT Errors**
   - Ensure `JWT_SECRET` is set
   - Check token expiration

3. **Email Not Sending**
   - Verify email credentials
   - Check Gmail app passwords for Gmail accounts

4. **CORS Errors**
   - Update `CLIENT_BASE_URLS` in `.env`

## Contributing

1. Follow TypeScript and ESLint rules
2. Add proper error handling
3. Update API documentation
4. Test all endpoints
5. Follow RESTful conventions
