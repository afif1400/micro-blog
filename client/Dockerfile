FROM node:alpine

#bug in create-react-app
ENV CI=true

WORKDIR /app
COPY package.json ./
RUN npm install
COPY ./ ./



CMD ["npm", "start"]