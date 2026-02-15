
## Environment Setup

### Server Environment Variables (.env)
Create a `.env` file in the root directory with the following variables:
```
PORT=8080
DEV_MODE=Development
MONGO_URL=mongodb://localhost:27017/bloodbank
JWT_SECRET=your_jwt_secret_key_here
```

### Client Environment Variables (.env)
Create a `.env` file in the client directory with the following variables:
```
REACT_APP_BASEURL=http://localhost:8080/api/v1
```

## Installation and Setup

1. Clone the repository
2. Install server dependencies:
   ```
   npm install
   ```
3. Install client dependencies:
   ```
   cd client
   npm install
   ```
4. Run the development server:
   ```
   npm run dev
   ```

## Features
- User authentication and authorization
- Blood inventory management
- Blood donation and request tracking
- Analytics and reporting
- Admin dashboard





