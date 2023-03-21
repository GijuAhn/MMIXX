FROM openjdk:11-jre
COPY build/lib/*.jar app.jar
ENTRYPOINT [ "java", "-jar", "app.jar" ]