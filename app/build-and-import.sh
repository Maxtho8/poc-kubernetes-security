#!/bin/sh

# Script to build the images and import them to local k3s

docker build -t jsplayground/web:latest ./web
docker build -t jsplayground/runner:latest ./runner

docker save --output jsplayground-web.tar.gz jsplayground/web:latest
docker save --output jsplayground-runner.tar.gz jsplayground/runner:latest

sudo k3s ctr image import jsplayground-web.tar.gz
sudo k3s ctr image import jsplayground-runner.tar.gz

