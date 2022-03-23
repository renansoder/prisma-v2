--> Config inicial
yarn init -y
yarn add sucrase nodemon -D
yarn add express
yarn add prisma -D

--> Rodar prisma
yarn prisma init
yarn add @prisma/client

--> Para criar as tabelas
yarn prisma migrate dev

yarn prisma studio
