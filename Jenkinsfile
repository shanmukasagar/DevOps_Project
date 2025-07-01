pipeline {
  agent any

  environment {
    DOCKERHUB_CREDENTIALS = credentials('dockerhub-creds')
    DOCKER_USER = "${DOCKERHUB_CREDENTIALS_USR}"
    DOCKER_PASS = "${DOCKERHUB_CREDENTIALS_PSW}"
  }

  stages {
    stage('Clone Repo') {
      steps {
        git branch: 'main', url: 'https://github.com/shanmukasagar/DevOps_Project.git'
      }
    }

    stage('Build Docker Images') {
      steps {
        bat "docker build -t %DOCKER_USER%/repo_1 ./client"
        bat "docker build -t %DOCKER_USER%/repo_2 ./server"
      }
    }

    stage('Push Docker Images') {
      steps {
        bat "echo %DOCKER_PASS% | docker login -u %DOCKER_USER% --password-stdin"
        bat "docker push %DOCKER_USER%/repo_1"
        bat "docker push %DOCKER_USER%/repo_2"
      }
    }

    stage('Deploy to Kubernetes') {
      steps {
        bat "kubectl apply -f ./k8s"
      }
    }
  }
}
