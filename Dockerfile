# Use an official Node.js runtime as the base image
FROM node:18-alpine

WORKDIR /app

# Copy the dependencies files into the container's current directory
COPY package*.json ./

RUN npm install

COPY . .

# Expose the port that the development server will run on
EXPOSE 5173

# Start the development server
CMD ["npm", "run", "dev"]