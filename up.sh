#!/bin/bash
docker-compose -f apache/docker-compose.yml up --build -d
docker-compose -f backend/docker-compose.yml up --build -d
docker-compose -f frontend/docker-compose.yml up --build -d
echo done