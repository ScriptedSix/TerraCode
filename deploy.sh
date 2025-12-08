#!/bin/bash
cd /home/ubuntu/your-repo

git pull origin main

cd server
npm install
pm2 restart backend

cd ../client
npm install
npm run build
pm2 restart frontend

