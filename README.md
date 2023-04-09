# Yeeter server Docker image
This repository contains a Docker image for running a Node.js server. The image is stored in AWS Elastic Container Registry (ECR).

# Heading 2 Usage
To use this Docker image, you will need to have Docker installed on your computer. You can download Docker [here](https://www.docker.com/products/docker-desktop/).

# Heading 2 Pull the Docker image
To pull the Docker image from ECR, you can use the following command:
`docker pull public.ecr.aws/d1s2y5r0/twitter:1.0`

# Heading 2 Run the Docker container
To run the Docker container, use the following command:
`docker run -p <local-port>:<container-port> public.ecr.aws/d1s2y5r0/twitter:1.0`

Replace <local-port> with the port number on your computer that you want to use to access the server, <container-port> with the port number on which your Node.js server is running inside the container.

For example:

`docker run -p 3000:8080 public.ecr.aws/d1s2y5r0/twitter:1.0`

# heading 2 Stop the Docker container
To stop the Docker container, press Ctrl+C in the terminal window where the container is running.

# heading 2 Updating the Docker image
If you want to update the Docker image with a new version of your Node.js server, you can follow these steps:

Make changes to your Node.js server code.

Build a new Docker image using the updated code.

`docker build -t <repository-url>:<new-version-number>`

Push the new Docker image to ECR.

`docker push public.ecr.aws/d1s2y5r0/twitter:1.0`

Update the Docker image URL in this README file.

Commit and push your changes to this GitHub repository.

# heading 2 Troubleshooting
If you have any issues with running the Docker container, try the following:

Make sure that Docker is installed and running on your computer.

Check that the port numbers in the docker run command are correct.

Check the logs of the Docker container for any error messages.



