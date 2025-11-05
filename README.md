# URL Shortener Frontend

A modern React-based frontend for the URL Shortener microservice with authentication, URL management, and expiry tracking.

## Features

- User authentication (register/login)
- URL shortening with optional custom aliases
- Set expiry dates for URLs
- Copy to clipboard
- Delete URLs
- Responsive design
- Toast notifications

## Tech Stack

- React 19
- Tailwind CSS 4
- Vite
- React Toastify
- Lucide React Icons

## Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Configuration

Update API endpoints in `src/App.jsx`:

```javascript
const API_BASE_URL = 'http://localhost:5001/api/v1';      // Auth Service
const API_BASE_URLL = 'http://localhost:5002/api/v1';     // URL Service
const API_BASE_URLLL = 'http://localhost:5003/api/v1';     // Redirect Service
```

## API Endpoints Required

### Auth Service (Port 5001)
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login

### URL Service (Port 5002)
- `POST /api/v1/url/shorten` - Create short URL
- `GET /api/v1/url` - Get all user URLs
- `DELETE /api/v1/url/:shortId` - Delete URL

## Docker Deployment

```bash
# Build image
docker build -t url-shortener-frontend .

# Run container
docker run -d -p 3000:80 url-shortener-frontend
```

## Environment Variables

Create `.env` file:

```env
VITE_AUTH_API_URL=http://localhost:5001/api/v1
VITE_URL_API_URL=http://localhost:5002/api/v1
VITE_REDIRECT_API_URL=http://localhost:5003/api/v1
```

## Project Structure

```
src/
├── App.jsx          # Main component
├── main.jsx         # Entry point
└── index.css        # Global styles
```