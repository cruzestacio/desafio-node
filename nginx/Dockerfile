FROM nginx:latest

RUN rm /etc/nginx/conf.d/*.conf

COPY nginx.conf /etc/nginx/conf.d

RUN mkdir /var/www/html -p && touch /var/www/html/index.html