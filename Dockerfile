FROM ubuntu:18.04
WORKDIR /var/www
COPY ./ ./
COPY utils/wait-for.sh wait-for.sh
RUN apt-get update
RUN apt-get -y install sudo
RUN apt-get install --yes curl
RUN curl --silent --location https://deb.nodesource.com/setup_16.x | sudo bash -
RUN apt-get install --yes nodejs
RUN apt-get install --yes netcat
RUN chmod +x wait-for.sh
RUN npm install && npm run build
EXPOSE 5000