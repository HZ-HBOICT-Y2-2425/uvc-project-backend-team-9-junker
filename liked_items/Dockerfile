# Use Node.js as the base image
FROM node:22.11.0

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (including dev dependencies like nodemon)
RUN npm install

# Copy the rest of the application
COPY . .

# Expose the application port
EXPOSE 3013

# Start the application using nodemon
CMD ["npm", "run", "dev"]
