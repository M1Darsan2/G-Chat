# GChat

A real-time chat application built with the MERN stack, Socket.io, and Redis — supporting instant messaging, online presence, and group conversations.

## Features

- **Real-time messaging** — instant message delivery powered by Socket.io
- **Online presence** — see which users are currently online
- **Group/room chats** — create and join multiple conversation rooms
- **Persistent chat history** — messages stored in MongoDB
- **Authentication** — secure JWT-based login with httpOnly cookies
- **Session/state caching** — Redis (ioredis) for fast, scalable real-time state

## Tech Stack

**Frontend**
- React
- Tailwind CSS
- Socket.io-client

**Backend**
- Node.js + Express
- Socket.io
- MongoDB + Mongoose
- Redis (ioredis)
- JWT authentication

## Project Structure

```
GChat/
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── config/
│   ├── socket/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── hooks/
│   └── vite.config.js
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB (local or Atlas)
- Redis instance (local or Redis Cloud)

### 1. Clone the repository

```bash
git clone https://github.com/your-username/GChat.git
cd GChat
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
REDIS_URL=your_redis_connection_string
CLIENT_URL=http://localhost:5173
```

Run the backend:

```bash
npm run dev
```

### 3. Frontend setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```
VITE_API_URL=http://localhost:8000
```

Run the frontend:

```bash
npm run dev
```

### 4. Open the app

Visit `http://localhost:5173` in your browser.

## How It Works

1. Users register/login via JWT-authenticated REST endpoints.
2. On login, a Socket.io connection is established and authenticated using the session.
3. Messages sent by a user are emitted through Socket.io and broadcast to the relevant room/recipient in real time.
4. Redis tracks online users and active socket connections for fast lookups.
5. All messages are persisted to MongoDB for chat history.

## Roadmap

- [ ] Typing indicators
- [ ] Read receipts
- [ ] File/image sharing in chat
- [ ] Push notifications

## License

This project is open source and available under the MIT License.
