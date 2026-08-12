# Mini Kanban

Aplicação web de gerenciamento de tarefas desenvolvida como desafio Full Stack.

O projeto permite criar, visualizar, editar, movimentar e excluir tarefas através de uma interface Kanban.

## Tecnologias

### Frontend

- React
- Vite
- JavaScript
- CSS

### Backend

- Go
- HTTP Server
- API REST
- JSON

## Funcionalidades

- Criar tarefas
- Listar tarefas
- Editar tarefas
- Excluir tarefas
- Mover tarefas entre colunas
- Validação de título
- Validação de status
- Feedback de carregamento
- Feedback de erros
- Interface responsiva

## Status das tarefas

As tarefas possuem três estados:

- `todo` — A fazer
- `doing` — Em progresso
- `done` — Concluídas

## Estrutura do projeto

```text
desafio-fullstack-veritas/
│
├── backend/
│   ├── handlers.go
│   ├── models.go
│   ├── main.go
│   └── go.mod
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Column.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   └── TaskForm.jsx
│   │   │
│   │   ├── services/
│   │   │   └── api.js
│   │   │
│   │   ├── App.jsx
│   │   └── App.css
│   │
│   └── package.json
│
└── README.md

## User Flow

O fluxo de utilização da aplicação é representado no diagrama abaixo:

![User Flow do Mini Kanban](docs/user-flow.png)