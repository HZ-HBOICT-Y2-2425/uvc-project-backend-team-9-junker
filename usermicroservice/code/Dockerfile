FROM node:22.11.0

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json first (for caching)
COPY /package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the correct port (match the one in docker-compose)
EXPOSE 3012

# Set the command to start the application
CMD ["npm", "run", "dev"]