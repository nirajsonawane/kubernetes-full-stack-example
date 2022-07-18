node {

    stage("Git Clone"){

        git credentialsId: 'GIT_CREDENTIALS', url: 'https://github.com/NDThuong/kubernetes-full-stack-example.git'
    }

    stage("Docker build"){
        sh 'docker version'

        dir ("spring-boot-student-app-api"){
            sh 'mvn install'
        }

        dir ("react-student-management-web-app"){
            sh 'docker build -t ndthuong/student-app-client .'
        }
    }

        withCredentials([string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'PASSWORD')]) {
            sh 'docker login -u ndthuong -p $PASSWORD'
        }

    stage("Push Image to Docker Hub"){
        dir ("spring-boot-student-app-api"){
            sh 'mvn dockerfile:push'
        }
        sh 'docker push ndthuong/student-app-client'
    }
    stage('Deploy React application on Kubernetes') {
            sh 'helm install dieuthuong GIT_CREDENTIALS'
    }
    stage('Deploy MongoDB persistance layer on Kubernetes') {
            sh 'helm install dieuthuong demo'
    }
    stage('Deploy Spring Boot Backend API on Kubernetes') {
            sh 'helm install dieuthuong demo'
    }
    stage('Deploy Istio and expose services using Istio VirtualService and Gateway and connect frontend to backend') {
            sh 'helm install dieuthuong demo'
    }
    stage('Deploy Prometheus and graffana and able to monitor using them') {
            sh 'helm install dieuthuong demo'
    }
  


    
    
}
