FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install --quiet

COPY . .


EXPOSE 8080

ENV PORT_ONE=8080

ENV MONGO_URI=mongodb://host.docker.internal:27017/product-service


CMD ["node","index.js"]
