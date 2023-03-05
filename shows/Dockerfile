FROM alpine:latest

RUN apk add --no-cache --update nodejs npm \
  && node --version \
  && npm config set registry https://registry.npmjs.org/

WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev
COPY ./ ./

CMD ["npm", "run", "start"]