# King It Test

This is a Next.js application for displaying hotel offers, containerized using Docker.

## Requirements

- [Docker](https://www.docker.com/get-started) installed on your machine.
- [Docker Compose](https://docs.docker.com/compose/install/) installed.

## Run the Application

To run the application locally using Docker Compose, follow these steps:

1. Check environment is set correctly. Need to add .env from .env.example properly.

1. Open a terminal and navigate to the project root directory.

2. Use the following command to start the services:

   ```bash
   docker-compose up
   ```

3. After the command executes successfully, you can access the application in your web browser at:

   ```
   http://localhost:3000
   ```

4. To stop the application, you can press `CTRL+C`.

## Environment Variables

Make sure to set up the necessary environment variables in your `docker-compose.yml` or through an `.env` file as needed for your application to run correctly.