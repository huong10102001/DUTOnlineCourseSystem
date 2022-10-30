pipeline {

  agent none

  environment {
    DOCKER_IMAGE_BACKEND = "bangpham2325/backend_image"
    DOCKER_IMAGE_FRONTEND = "bangpham2325/frontend-image"
  }

  stages {
    stage("build image backend") {
      agent { node {label 'master'}}
      environment {
        DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
      }
      steps {
        sh "docker build -t ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} . "
        sh "docker tag ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG} ${DOCKER_IMAGE_BACKEND}:latest"
        sh "docker image ls | grep ${DOCKER_IMAGE_BACKEND}"
        withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
            sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
            sh "docker push ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}"
            sh "docker push ${DOCKER_IMAGE_BACKEND}:latest"
        }

        //clean to save disk
        sh "docker image rm ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}"
        sh "docker image rm ${DOCKER_IMAGE_BACKEND}:latest"
      }
    }

    stage("build images frontend") {
      agent { node {label 'master'}}
      environment {
        DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
      }
      steps {
        dir("src/frontend") {
            sh "pwd"
            sh "docker build -t ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG} . "
            sh "docker tag ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG} ${DOCKER_IMAGE_FRONTEND}:latest"
            sh "docker image ls | grep ${DOCKER_IMAGE_FRONTEND}"
            withCredentials([usernamePassword(credentialsId: 'docker-hub', usernameVariable: 'DOCKER_USERNAME', passwordVariable: 'DOCKER_PASSWORD')]) {
                sh 'echo $DOCKER_PASSWORD | docker login --username $DOCKER_USERNAME --password-stdin'
                sh "docker push ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}"
                sh "docker push ${DOCKER_IMAGE_FRONTEND}:latest"
            }

            //clean to save disk
            sh "docker image rm ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}"
            sh "docker image rm ${DOCKER_IMAGE_FRONTEND}:latest"
        }
      }
    }
    stage('deploy server'){
        agent { node {label 'master'}}
        environment {
          DOCKER_TAG="${GIT_BRANCH.tokenize('/').pop()}-${GIT_COMMIT.substring(0,7)}"
        }
        steps{
            sshagent(credentials:['login_digitalocean']){
               sh "ssh  -o StrictHostKeyChecking=no  bangpham@10.104.0.3 sudo docker pull ${DOCKER_IMAGE_FRONTEND}:${DOCKER_TAG}"
               sh "ssh  -o StrictHostKeyChecking=no  bangpham@10.104.0.3 sudo docker pull ${DOCKER_IMAGE_BACKEND}:${DOCKER_TAG}"
               sh "ssh  -o StrictHostKeyChecking=no  bangpham@10.104.0.3 sudo docker-compose up -d"
            }
            echo "success login"
        }
    }
  }

  post {
    success {
      echo "SUCCESSFUL"
    }
    failure {
      echo "FAILED"
    }
  }
}
