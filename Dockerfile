FROM node:20.14-alpine AS builder

#  Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json .

# Install the dependencies
RUN npm ci
# Copy the source code
COPY . .

# Build the application
RUN npm run build
RUN npm prune --production

FROM node:20.14-alpine AS deployer

WORKDIR /app

COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .

EXPOSE 4978

ENV NODE_ENV=production

CMD [ "node", "build" ]