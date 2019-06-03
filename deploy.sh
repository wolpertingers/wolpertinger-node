#!/bin/bash
npm install -f frontend/app --prefix frontend/app
npm run build --prefix frontend/app --production
./up.sh