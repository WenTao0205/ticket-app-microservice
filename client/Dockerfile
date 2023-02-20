FROM alpine:latest

RUN apk add --no-cache --update nodejs npm \
  && node --version \
  && npm config set registry https://registry.npm.taobao.org

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./

CMD ["npm", "run", "dev"]