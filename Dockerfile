# # Use official Node.js runtime as base image
# FROM node:18-alpine

# # Set working directory in container
# WORKDIR /app

# # Copy backend package files
# COPY backend/package*.json ./backend/

# # Install dependencies
# WORKDIR /app/backend
# RUN npm install

# # Copy backend source code
# COPY backend/ .

# # Expose port (adjust if your app uses a different port)
# EXPOSE 5000

# # Set environment to production
# ENV NODE_ENV=production

# # Start the application
# CMD ["npm", "start"]


FROM node:18-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm install

COPY frontend/ .

EXPOSE 3000

CMD ["npm", "start"]