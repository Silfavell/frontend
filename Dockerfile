FROM nginx

COPY ./private /etc/nginx/certs

COPY ./default.conf /etc/nginx/conf.d

EXPOSE 443 
EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
