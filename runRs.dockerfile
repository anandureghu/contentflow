FROM node:16

RUN npm install run-rs -g -y

CMD ["run-rs", "-v", "4.0.0", "--shell"]
