# images/nginx/Dockerfile
FROM nginx:stable-alpine


COPY proxy_params /etc/nginx/proxy_params

COPY nginx.conf /etc/nginx/nginx.conf
COPY conf.d/ /etc/nginx/conf.d/
COPY nginx-certs/ /etc/nginx/nginx-certs/
#ports
EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
