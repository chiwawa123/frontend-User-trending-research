#stage 1
FROM node:16.20.2-alpine as builder
WORKDIR /app
RUN mkdir dist-app
COPY package*.json ./
RUN npm install -g npm@9.8.1
RUN npm install -g @angular/cli
COPY . .
RUN npm run build --omit=dev
#stage 2
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/ /usr/share/nginx/html
EXPOSE 80


