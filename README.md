### -->Configs
yarn init -y

yarn add sucrase nodemon prisma -D

yarn add express

### -->Rodar prisma
yarn prisma init

yarn add @prisma/client

### -->Para criar as tabelas
yarn prisma migrate dev

### -->O que é criado no Schema reflita no index.js
yarn prisma generate

### -->Web
yarn prisma studio
