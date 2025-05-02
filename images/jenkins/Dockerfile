FROM jenkins/jenkins:lts

USER root

# Install Docker CLI (for Jenkins jobs that use docker)
RUN apt-get update && \
    apt-get install -y docker.io curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Set up Docker group access (important for host docker.sock usage)
ARG DOCKER_GID=984
RUN groupadd -g ${DOCKER_GID} docker || true && \
    usermod -aG docker jenkins

# Disable any leftover debug flags
ENV JAVA_OPTS=""
ENV JENKINS_JAVA_OPTIONS=""

USER jenkins

# Preload plugin list and groovy init scripts
COPY plugins.txt /usr/share/jenkins/ref/plugins.txt
COPY init.groovy.d/ /usr/share/jenkins/ref/init.groovy.d/

# Optional: preload plugins during build (faster startup)
RUN jenkins-plugin-cli --plugin-file /usr/share/jenkins/ref/plugins.txt
