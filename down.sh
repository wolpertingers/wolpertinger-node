#!/bin/bash
docker-compose -f frontend/docker-compose.yml down -v
docker-compose -f backend/docker-compose.yml down -v
docker-compose -f apache/docker-compose.yml down -v
echo done