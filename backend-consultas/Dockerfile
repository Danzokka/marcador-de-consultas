# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Nest.js application
RUN npx prisma generate
RUN npm run build

# Expose the application port
EXPOSE 5000

# Run Prisma migrations and start the application
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]