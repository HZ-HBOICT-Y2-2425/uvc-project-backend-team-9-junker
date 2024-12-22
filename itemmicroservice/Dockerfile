# Use the Node.js base image
FROM node:22.11.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install --unsafe-perm

# Copy the rest of the application code
COPY . .

# Expose the port the application listens on
EXPOSE 3013

# Command to start the application
CMD ["npm", "run", "dev"]
