# images/nginx/Dockerfile
FROM nginx:stable-alpine

WORKDIR /etc/nginx

COPY proxy_params /etc/nginx/proxy_params

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/ /etc/nginx/conf.d/
COPY nginx-certs/ /etc/nginx/nginx-certs/

EXPOSE 80 443

HEALTHCHECK --interval=10s --timeout=3s CMD curl -f http://localhost || exit 1

CMD ["nginx", "-g", "daemon off;"]
