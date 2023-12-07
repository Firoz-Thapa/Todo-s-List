FROM ubuntu:22.04

# Set up the apt-get command to use non-interactive mode to avoid prompts during installation
ENV DEBIAN_FRONTEND=noninteractive

# Update the package list
RUN apt-get update && apt-get install -y curl

# Install the latest LTS version of Node.js using curl
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

RUN apt-get install -y libcairo2 libcairo-gobject2 libxt6 libsm6 libice6 libgtk-3-0 libx11-xcb1 libdbus-glib-1-2 psmisc xvfb libappindicator1 libasound2 libatk1.0-0 libatk-bridge2.0-0 libcairo-gobject2 libgconf-2-4 libgtk-3-0 libice6 libnspr4 libnss3 libsm6 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 libxfixes3 libxi6 libxinerama1 libxrandr2 libxss1 libxt6 libxtst6 fonts-liberation
# Install Firefox
RUN apt-get update && apt-get install -y firefox

# Set the working directory to /app
WORKDIR /app

# Copy the package.json file from the local machine to the container
COPY package*.json .

# Install the dependencies for your application using npm
RUN npm install
# Copy the application files from the local machine to the container
COPY . .
# Set the environment variable for the port
ENV PORT 3000

# Expose the port
EXPOSE $PORT
# Start the application when the container starts
CMD ["npm", "test"] 