#FROM node:alpine
#
#WORKDIR /usr/src/app
#
#COPY . /usr/src/app
#
#RUN npm install -g @angular/cli@17.3.0
#
#RUN npm install
#
#CMD ["ng", "serve", "--host", "0.0.0.0"]

#Step 1:
FROM node:20.11.1 as node

WORKDIR /app

COPY package*.json ./

RUN npm ci

RUN npm install -g @angular/cli@17.3.0

COPY . .

RUN npm run build --configuration=production

#Step 2:
# Use the official Nginx image as the base image
FROM nginx:latest

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=node /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
