# Zoiko Telecom Chatbot

A multi-channel support and conversion chatbot for Zoiko Telecom, based on the Zoiko technical specification and conversation flow documents.

- Backend: Node.js + Express
- Frontend: React + Vite
- Database: MongoDB + Mongoose (optional)
- Assistant persona: Zakko

## What It Covers

- Mobile plans on the EE network
- Broadband availability on the BT network
- Business landlines and digital voice
- Business solutions and infrastructure
- Phones, accessories, and reseller journeys
- Fallback handling and agent escalation
- Session-aware intent memory and lightweight analytics logging

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## Environment

```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
MONGODB_URI=mongodb://127.0.0.1:27017/zoiko_chatbot
```

If MongoDB is not available, the app still works by reading from `data/knowledge.json`.

## API

- GET /api/health
- POST /api/chat
- GET /api/analytics
