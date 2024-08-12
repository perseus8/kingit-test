# Phase 1: Compile the app
FROM node:20 AS compile-phase

# Set up working directory
WORKDIR /app

# Bring in dependency files
COPY package.json package-lock.json ./

# Install all required dependencies (including development ones)
RUN npm install

# Move the application source code
COPY . .

# Execute the build process
RUN npm run build

# Phase 2: Prepare the final image
FROM node:20 AS deploy-phase

# Set up working directory
WORKDIR /app

# Transfer the compiled output and essential files from the compile phase
COPY --from=compile-phase /app ./

# Trim down to just production dependencies
RUN npm prune --production

# Make port 3000 accessible outside the container
EXPOSE 3000

# Set the command to initiate the app
CMD ["npm", "start"]
