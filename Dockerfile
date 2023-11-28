# Étape de construction
FROM node:latest as build-step
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
RUN npm run build

# Étape de production
FROM nginx:alpine
COPY --from=build-step /app/dist/frontend /usr/share/nginx/html