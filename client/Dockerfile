# Use Node.js 18 base image
FROM node:18

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose the port React uses
EXPOSE 3000

# Start the development server
CMD ["npm", "start"]
