# Stage 1: Build the server and React app
FROM node:20-alpine3.19 AS build

WORKDIR /usr/src/app

# Install server dependencies
COPY ./backend/vite.config.mjs ./
COPY ./backend/package*.json ./
RUN npm install vite --loglevel=verbose

# Copy server code and build it
COPY ./backend/src ./src
RUN npm run build

# Install React app dependencies and build it
WORKDIR /usr/src/app/frontend
COPY ./frontend/package*.json ./
RUN npm install
COPY ./frontend/ .
RUN npm run build

# Stage 2: Create the production image
FROM node:20-slim AS production

WORKDIR /usr/src/app

# Copy server environment variables
COPY ./backend/.env ./

# Copy built server files
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./
RUN npm install --loglevel=verbose --production

# Copy only the React build files
COPY --from=build /usr/src/app/frontend/build ./frontend

# Expose the application port
EXPOSE 3000

# Start the server
CMD ["node", "dist/index.js"]