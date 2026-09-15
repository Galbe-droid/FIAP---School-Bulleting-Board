# Architecture

## Camadas

Controller

↓

Service

↓

Repository

↓

Prisma

↓

SQLite

## Estrutura

src/

├── controllers/

├── services/

├── repositories/

├── routes/

├── models/

└── database/

## Responsabilidades

Controller

Recebe a requisição HTTP e devolve a resposta.

Service

Contém as regras de negócio.

Repository

Responsável pelo acesso ao banco utilizando Prisma.

Database

SQLite utilizando Prisma ORM.