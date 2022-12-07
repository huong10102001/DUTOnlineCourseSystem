FROM node:12.20.1-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY /package.json ./
RUN npm i --silent
#RUN npm install react-scripts@3.4.1 -g --silent
COPY . ./
# ENV REACT_APP_HOST_IP_ADDRESS $API_URL
#RUN npm run build-production

# Build step 2(Deploying build on NGINX)
FROM nginx:1.18
RUN  apt-get update \
  && apt-get install -y wget \
  && rm -rf /var/lib/apt/lists/*
RUN rm -rf /usr/share/nginx/html/*
#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
#
### Remove default nginx index page
#WORKDIR /app
## Copy from the stahg 1
#COPY --from=build /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf
#COPY --from=build /app/dist /usr/share/nginx/html
#CMD ["nginx", "-g", "daemon off;"]