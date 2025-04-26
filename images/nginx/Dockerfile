FROM nginx:stable-alpine

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/ /etc/nginx/conf.d/
COPY nginx-certs/ /etc/nginx/nginx-certs/

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
