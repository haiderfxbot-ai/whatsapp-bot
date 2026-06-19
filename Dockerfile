FROM ghcr.io/puppeteer/puppeteer:22.12.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "start"]
