# FIAP School Bulletin Board

Projeto desenvolvido para o Tech Challenge da FIAP, consistindo em uma plataforma de mural escolar onde professores podem criar e gerenciar postagens e alunos podem visualizar os conteúdos publicados.

O projeto é composto por um **backend REST** desenvolvido com Node.js e TypeScript e um **frontend** desenvolvido com React e TypeScript.

---

## Tecnologias

### Backend

- Node.js
- TypeScript
- Express
- Prisma ORM
- SQLite
- JWT
- Bcrypt
- Jest
- Supertest
- Docker
- GitHub Actions

### Frontend

- React
- TypeScript
- Vite
- Material UI
- React Router
- Axios
- Docker

---

## Funcionalidades

### Autenticação

- Registro de usuários
- Login
- Logout
- Autenticação utilizando JWT
- Controle de acesso baseado em roles
- Proteção de rotas

Roles disponíveis:

- `TEACHER` — Professor
- `STUDENT` — Aluno

### Postagens

- Listagem de postagens
- Busca por palavra-chave
- Visualização de uma postagem
- Criação de postagens
- Edição de postagens
- Exclusão de postagens

Status disponíveis:

- `PUBLISHED`
- `DRAFT`
- `ARCHIVED`

Professores possuem acesso às operações de gerenciamento das postagens.

---
## Autor

Gabriel
