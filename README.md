# FIAP Task Manager
Simple application made with with [Next.js] and [MongoDB](https://www.mongodb.com).

## Requiremnts
Basically we need:
- [Node.js] v14+
- [Docker] For [MongoDB] and [mongo-express].

## Run (back-end)
To run the [Next.js]:
```sh
cd backend
npm i
npm run dev
```
## Run container
To create MongoDB and mongo-express containers:
```sh
docker-compose up -d --build
```

[Node.js]: <https://nodejs.org/en/>
[Next.js]: <https://nextjs.org/>
[MongoDB]: <https://www.mongodb.com>
[mongo-express]: <https://github.com/mongo-express/mongo-express>
[Docker]: <https://www.docker.com/>
