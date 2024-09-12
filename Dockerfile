FROM node:18-alpine3.18

WORKDIR /app

COPY package.json ./

# Copy Prisma files from root
COPY prisma ./prisma/
COPY . .

RUN npm install

# Generate Prisma Client
RUN npx prisma generate

# RUN npx prisma migrate dev

EXPOSE 3000

CMD ["npm", "run", "dev:docker"]
