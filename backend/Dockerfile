# Use a Node.js base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the source code into the container
COPY . .

# Expose the app port
EXPOSE 5000

# Start the Express server
CMD ["npm", "start"]
