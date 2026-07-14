# School Bulleting Board API

## Tecnologias

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- Docker
- Jest
- GitHub Actions

## Arquitetura

Controller
↓
Service
↓
Repository
↓
Prisma
↓
SQLite

## Como executar

### Sem Docker

Criar arquivo .env e seguir o .env.exemple, O prisma esta configurado para o SQLlite 

npm install

npx prisma generate

npx prisma db push

npm run dev

### Com Docker

Criar arquivo .env e seguir o .env.exemple, O prisma esta configurado para o SQLlite 

docker compose up --build

## Executando os testes

npm test

## Cobertura

npm test -- --coverage


## CI/CD

O projeto utiliza GitHub Actions para:

- Instalar dependências
- Gerar o Prisma Client
- Executar os testes
- Validar a construção da imagem Docker

## Autor

Gabriel
