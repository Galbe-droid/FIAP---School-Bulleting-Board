# API Documentation

## GET /posts

Lista todas as postagens.

### Response

```json
[
  {
    "id": 1,
    "title": "Node.js",
    "author": "Gabriel",
    "status": "PUBLISHED",
    "createAt": "Create Date",
    "updatedAt": "Update Date",
  }
]
```

## GET /posts/:id

Lista uma postagem em especifico 

### Response

```json
[
  {
    "id": 1,
    "title": "Node.js",
    "author": "Gabriel",
    "status": "PUBLISHED",
    "createAt": "Create Date",
    "updatedAt": "Update Date",
  }
]
```

---

## POST /posts

Cria uma nova postagem.

### Request

```json
{
  "title": "Node",
  "content": "Conteúdo",
  "author": "Gabriel",
  "status": "PUBLISHED"
}
```

### Response

```json
{
  "id": 1,
  "title": "Node",
  "author": "Gabriel",
  "status": "PUBLISHED",
  "createAt": "Date.Now",
  "updatedAt": "Date.Now",
}
```

## PUT /posts

Atualiza uma postagem ja feita 

### Request

```json
{
  "title": "Node",
  "content": "Conteúdo",
  "author": "Gabriel",
  "status": "PUBLISHED"
}
```

### Response

```json
{
  "id": 1,
  "title": "Node",
  "author": "Gabriel",
  "status": "PUBLISHED",
  "createAt": "Create Date",
  "updatedAt": "Date.Now",
}
```

## DELETE /posts/:id

Deleta uma postagem ja feita 

### Response

```json
{
  "result": true
}
```

## GET /posts/search

Mostra resultados que seja iguais ao valor da pesquisa, comparando com texto ou titulo

### Request

```json
{
  "term": "Node",
}
```

### Response

```json
[
  {
    "id": 1,
    "title": "Node.js",
    "author": "Gabriel",
    "status": "PUBLISHED",
    "createAt": "Create Date",
    "updatedAt": "Update Date",
  }
]
```
