FROM jenkins/jenkins:lts

# Clear debug flags
ENV JAVA_OPTS=""
ENV JENKINS_JAVA_OPTIONS=""

USER root
RUN apt-get update && apt-get install -y docker.io curl \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

ARG DOCKER_GID=984
RUN groupadd -g ${DOCKER_GID} docker || true && \
    usermod -aG docker jenkins

USER jenkins

COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt

COPY init.groovy.d/ /usr/share/jenkins/ref/init.groovy.d/
