# Node-driveX-chatbot

A MERN-style rebuild of the original `driverX-chatbot`:

- Backend: Node.js + Express
- Frontend: React + Vite
- Database: MongoDB + Mongoose

The chatbot content and intent behavior are carried over from the original `driverX-chatbot/data/knowledge.json`.

## Project Structure

- `backend/` - Express API and MongoDB integration
- `frontend/` - React chatbot UI
- `data/knowledge.json` - copied DriverX knowledge base

## Backend Setup

```bash
cd backend
npm install
copy .env.example .env
npm run dev
```

Default backend URL:

- `http://localhost:5000`

## Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev
```

Default frontend URL:

- `http://localhost:5173`

## MongoDB

By default the backend uses:

```env
MONGO_URI=mongodb://127.0.0.1:27017/driverx_chatbot
```

On first run, the backend seeds MongoDB from `data/knowledge.json` if the collection is empty.

## Production Build

```bash
cd frontend
npm install
npm run build

cd ..\backend
npm install
npm start
```

If `frontend/dist` exists, the Express server will serve it automatically.
