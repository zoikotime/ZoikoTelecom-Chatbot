# ---------- FRONTEND BUILD ----------
# FRONTEND BUILD
# FRONTEND BUILD
FROM node:20-bullseye AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ .
COPY frontend/.env .env
RUN npm run build



# ---------- BACKEND ----------
FROM node:18
  
WORKDIR /app
  
# Copy backend
COPY backend/package*.json ./backend/
RUN cd backend && npm install
  
COPY backend ./backend
#---------- DATA ----------
COPY data ./backend/data

# Copy frontend build into backend (serve static)
COPY --from=frontend-build /app/frontend/dist ./backend/public

# Set working dir to backend
WORKDIR /app/backend

# Expose port (change if needed)
EXPOSE 8080

# Start backend
CMD ["npm", "start"]