# Construction
FROM node:latest as build-step
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build

# Deployment
FROM nginx:alpine
COPY --from=build-step /app/dist/frontend /usr/share/nginx/html
