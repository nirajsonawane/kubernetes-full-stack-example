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
    stage("istio"){
        sh 'helm repo add istio https://istio-release.storage.googleapis.com/charts'
        sh 'helm repo update'
        sh 'kubectl create namespace istio-system'
        sh 'helm install istio-base istio/base -n istio-system'
        sh 'helm install istiod istio/istiod -n istio-system --wait'
        sh 'kubectl create namespace istio-ingress'
        sh 'kubectl label namespace istio-ingress istio-injection=enabled'
        sh 'helm install istio-ingress istio/gateway -n istio-ingress --wait'
    }
    stage("prometheus"){
        sh 'helm repo add prometheus-community https://prometheus-community.github.io/helm-charts'
        sh 'helm install prometheus prometheus-community/prometheus'
        sh 'kubectl expose service prometheus-server --type=NodePort --target-port=9090 --name=prometheus-server-np'
    }
    stage("granfana"){
        sh 'helm repo add bitnami https://charts.bitnami.com/bitnami'
        sh 'helm install grafana bitnami/grafana'
        sh 'kubectl expose service grafana --type=NodePort --target-port=3000 --name=grafana-np'
    }
}
