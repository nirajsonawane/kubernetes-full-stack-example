#!/bin/bash
kubectl apply -f student-app-api-configmap.yaml
kubectl apply -f mongo-persistent-volume-claim.yaml
kubectl apply -f mongo-deployment.yaml
kubectl apply -f mongo-service.yaml
sleep 5
kubectl apply -f student-app-api-deployment.yaml
kubectl apply -f student-app-api-service.yaml
kubectl apply -f student-app-ingress.yaml
sleep 5