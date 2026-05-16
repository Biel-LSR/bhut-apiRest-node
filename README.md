# Car API — Node.js + Express + Axios

API REST com **3 endpoints** e **1 consumer**, consumindo **2 endpoints**
de uma API externa.

---

## Arquitetura

```
src/
├── server.js                        # Entry point + graceful shutdown
├── app.js                           # Factory do Express
├── config/
│   ├── env.js                       # Loader de variáveis de ambiente
│   └── logStore.js                  # Singleton de logs em memória
├── routes/
│   ├── car.routes.js                # GET /api/car | POST /api/car
│   └── logs.routes.js               # GET /api/logs
├── controllers/
│   ├── car.controller.js            # Valida req, chama consumer/service
│   └── logs.controller.js
├── services/
│   ├── apiClient.js                 # Axios configurado + interceptors
│   └── car.service.js               # GET e POST /v1/carro (API externa)
├── consumers/
│   └── car.consumer.js              # Orquestra: cria carro → grava log
└── middlewares/
    ├── requestLogger.middleware.js  # Trata logStore a cada request
    └── error.middleware.js          # Trata AxiosError vs erro interno
```

### Fluxo de dados

```
┌─────────────────────────────────────────────────────────────┐
│                        GET /api/car                         │
│                                                             │
│  Request → CarController.list()                             │
│               └─► CarService.getAll()                       │
│                       └─► GET /v1/carro  (API externa)      │
│                               └─► retorna lista de carros   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│                       POST /api/car                         │
│                                                             │
│  Request → CarController.create()                           │
│               └─► CarConsumer.createAndLog()   ← CONSUMER   │
│                       ├─► CarService.create()               │
│                       │       └─► POST /v1/carro (ext.)     │
│                       └─► logStore.add(evento de criação)   │
└─────────────────────────────────────────────────────────────┘
```

---

## Instalação

```Verificar as versões do Node e NPM

node -v  
npm -v

```bash
# 1. Instalar dependências
npm install express axios 

# 2. Configurar variáveis de ambiente
cp .env.example .env
```

## Execução

```bash
# Desenvolvimento (hot reload)
npm run dev

# Produção
npm start
```

Servidor disponível em **http://localhost:3001**.

---

## Endpoints

### `GET /api/car`
Retorna todos os carros da API externa (`GET api/carro`).



---

### `POST /api/car`
Cria um carro na API externa (`POST api/car`).
O consumer registra o evento de criação no LogStore.

**Body (application/json):**
```json
{
    "nome": "Fiesta",
    "marca": "Fiat",
    "preco": 99999,
    "anoFabricacao": 1999
}
```
---

## Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js | Runtime |
| Express | Framework HTTP |
| Axios | Cliente HTTP + interceptors |
| Morgan | Logger HTTP no console |
| dotenv | Variáveis de ambiente |
| uuid | IDs únicos para logs |
