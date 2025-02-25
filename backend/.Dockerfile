# Build Stage
FROM node:20-alpine3.19 AS build

WORKDIR /usr/src/app

COPY vite.config.mjs ./
COPY package*.json ./

# Prevent interactive prompts
ENV CI=true

# Install dependencies and build in one step to reduce layers
RUN npm install vite --loglevel=verbose

COPY ./src ./src

RUN npm run build

# Production Stage
FROM node:20-slim AS production

WORKDIR /usr/src/app

COPY .env ./
COPY --from=build /usr/src/app/dist ./dist
COPY --from=build /usr/src/app/package*.json ./

RUN npm install --loglevel=verbose

# Expose the application port
EXPOSE 4000

# Command to start the application
CMD ["node dist/index.js"]
