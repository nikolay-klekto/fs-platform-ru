FROM openjdk:17-oracle
ARG JAR_FILE=backend/domain/ru-client/build/libs/ru-client-0.0.2-SNAPSHOT.jar
WORKDIR /opt/app
COPY ${JAR_FILE} app.jar
EXPOSE 8183
ENTRYPOINT ["java","-jar","app.jar"]