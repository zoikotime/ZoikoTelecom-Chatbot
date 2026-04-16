# ---------- FRONTEND BUILD ----------
FROM node:20-bullseye AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
# Only copy .env if it exists (use a build arg or CI secret instead)
RUN test -f .env && cp .env .env.local || true
RUN npm run build


# ---------- BACKEND ----------
FROM node:20-bullseye

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend ./backend
# ---------- DATA ----------
COPY data ./backend/data

# Copy frontend build into backend (serve static)
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Set working dir to backend
WORKDIR /app/backend

# Expose port
EXPOSE 8080

# Start backend
CMD ["npm", "start"]
