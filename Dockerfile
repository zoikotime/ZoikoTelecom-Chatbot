FROM node:20-bullseye

WORKDIR /app

# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install

COPY backend ./backend
# ---------- DATA ----------
COPY data ./backend/data

# Copy prebuilt frontend assets into backend (serve static)
COPY frontend/dist ./backend/public

# Set working dir to backend
WORKDIR /app/backend

# Default to the Cloud Run / container port unless overridden at runtime
ENV PORT=8080

# Expose port
EXPOSE 8080

# Start backend
CMD ["npm", "start"]
