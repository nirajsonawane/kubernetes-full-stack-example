#!/bin/bash

cd k8s

minikube start && # && to execute the below cmds only if minikube start succeeds

# create deployment and service for client

kubectl apply -f student-app-client-deployment.yaml &&

kubectl apply -f student-app-client-service.yaml &&

# create persistent volume chain, deployment and service for database(mongodb)

kubectl apply -f mongo-persistent-volume-claim.yaml &&

kubectl apply -f mongo-deployment.yaml &&

kubectl apply -f mongo-service.yaml &&

# create deployment and service for server(api)

kubectl apply -f student-app-api-deployment.yaml &&

kubectl apply -f student-app-api-service.yaml &&

# enable ingress in minikube

minikube addons enable ingress &&

# apply ingress configuration

kubectl apply -f student-app-ingress.yaml

application_ip=$(eval "minikube ip")
echo "Application running at $application_ip"
