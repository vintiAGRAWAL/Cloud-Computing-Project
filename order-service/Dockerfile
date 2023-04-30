# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./
# Install the dependencies
RUN npm install --quiet

# Copy the rest of the application files to the container
COPY . .

# Expose port 5050 for incoming connections
EXPOSE 9090

# Set the environment variable for the port
ENV PORT_ONE=9090

# Set the environment variable for the MongoDB URI
ENV MONGO_URI=mongodb://host.docker.internal:27017/order-service

# Start the application when the container launches
CMD ["node", "index.js"]
