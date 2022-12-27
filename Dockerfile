FROM node:15

WORKDIR /usr/src/app

COPY ./node .

RUN apt-get update && \
    apt-get install -y wget netcat && \
    wget -q -O /usr/bin/wait-for https://raw.githubusercontent.com/eficode/wait-for/v2.2.3/wait-for && \
    chmod +x /usr/bin/wait-for

RUN npm init --yes
RUN npm install express --save
RUN npm install mysql --save

EXPOSE 3000


CMD ["node","index.js"]