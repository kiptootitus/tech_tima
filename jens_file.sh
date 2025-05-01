#!/bin/bash
set -e

# Step 1: Install Java (Jenkins requires Java)
echo "Updating package index..."
sudo apt update

if ! java -version &>/dev/null; then
  echo "Installing Java..."
  sudo apt install openjdk-11-jdk -y
else
  echo "Java already installed."
fi

# Step 2: Add Jenkins repository and key
echo "Adding Jenkins repository and key..."
curl -fsSL https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo tee \
  /usr/share/keyrings/jenkins-keyring.asc > /dev/null

echo deb [signed-by=/usr/share/keyrings/jenkins-keyring.asc] \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null

# Step 3: Install Jenkins
echo "Installing Jenkins..."
sudo apt update
sudo apt install jenkins -y

# Step 4: Start and enable Jenkins
echo "Starting Jenkins service..."
sudo systemctl start jenkins
sudo systemctl enable jenkins

# Step 5: Display status and initial password
sudo systemctl status jenkins --no-pager
echo "Jenkins initial admin password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword
