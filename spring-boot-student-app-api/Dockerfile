FROM openjdk:11
VOLUME /tmp
COPY target/*.jar app.jar
ENV JAVA_OPTS=""
ENTRYPOINT exec java -jar /app.jar
EXPOSE 8080
