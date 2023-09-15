FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]

# 1. docker build -t 01 .
# 2. docker images
# 3. docker run -p port:3000 Image ID
# 4. docker ps
# 5. docker stop Container ID
