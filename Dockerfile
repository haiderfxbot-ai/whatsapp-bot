FROM ghcr.io/puppeteer/puppeteer:22.12.0

# Set working directory
WORKDIR /app

# Copy package files and install dependencies cleanly
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port and start the application
EXPOSE 3000
CMD ["npm", "start"]
