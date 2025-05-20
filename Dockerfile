FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install -g nodemon 

COPY . .

EXPOSE 3000
EXPOSE 3001

CMD ["sh", "-c", "nodemon app.js & nodemon app-stats.js"]
