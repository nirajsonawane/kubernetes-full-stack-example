# kubernetes-full-stack-example
Source code for blog post https://nirajsonawane.github.io/2020/04/25/Deploy-React-Spring-Boot-MongoDB-Fullstack-application-on-Kubernetes/

1. Build the the app   
   ``mvn clean build``

2. Create the docker image

   ``docker build -t  johnhunsley/student-app-api ./``
3. Push the image to the docker hub repo 

   ``docker push johnhunsley/student-app-api``
4. Build the Kubernetes resources - mongo and the student api

   ``./k8s/student-api-mongo.sh``
5. expose the port from the minikube host to the ingress   
      ``sudo minikube tunnel``
