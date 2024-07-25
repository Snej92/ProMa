# Use a base image that includes Java
FROM openjdk:21

# Add a volume pointing to /tmp
VOLUME /tmp

# Make port 7081 available to the world outside this container
EXPOSE 7081

# Set the working directory
WORKDIR /app

# Add the application's jar to the container
COPY restapi-0.0.8.jar app.jar

# Copy the resources
COPY resources /app/resources

# Run the jar file
ENTRYPOINT ["java","-jar","app.jar"]
