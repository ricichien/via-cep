# Via Cep

Aplicação completa para busca, edição e visualização de dados de CEPs brasileiros, com suporte a favoritos, detalhes e exibição no mapa. Integração com Firebase para persistência dos dados.

![Captura de Tela (262)](https://github.com/user-attachments/assets/e7e0bd37-f114-467d-9fb8-414a5665ed11)

---

## Funcionalidades

- Pesquisa por CEP, logradouro, bairro ou localidade
- Visualização em cards com detalhes do endereço
- Edição de logradouro e bairro
- Marcar ou desmarcar um CEP como favorito
- Exibição de cada CEP no mapa
- Dados persistidos com Firebase Firestore
- Testes automatizados no backend com Jest e Supertest

---

## Imagens da Aplicação

### Barra de Pesquisa do CEP 
![Barra de Pesquisa](https://github.com/user-attachments/assets/fe5a5dab-868f-476e-9d81-c3fccb7be230)

### Alterar Bairro e Logradouro
![Alterar Bairro e Logradouro](https://github.com/user-attachments/assets/be7af715-cb65-465d-9500-9fc710ec7f7c)

### Editar, Favoritar e Detalhes do CEP
![Editar e Favoritar CEP](https://github.com/user-attachments/assets/ba3661e3-b40f-42e3-9c65-9776f6b69334)


---

## Estrutura da Aplicação

A aplicação é dividida em duas partes:

- **Backend**: Node.js + Express + Firebase Admin
- **Frontend**: React + Leaflet + Axios

---

## Requisitos

- Node.js 18+
- Conta no Firebase com projeto configurado
- Navegador moderno

---

## Backend

### Tecnologias utilizadas

- Express
- Firebase Admin SDK
- Axios
- Jest + Supertest (testes)
- dotenv
- CORS

### Estrutura, Instalação e Execução

> **Observação**: O projeto está estruturado em duas partes:
>
> - A pasta **`backend/`** contém a aplicação backend em Node.js, utilizando o **Firestore** como banco de dados. A URL do Firestore deve ser configurada no arquivo `.env`.
> - A pasta **`frontend/`** contém o frontend em **React**.

Para executar o projeto corretamente, siga as instruções abaixo:

---


## Instruções de Instalação

### Na pasta Backend

(Assumindo que você está na pasta via-cep, use o comando no terminal cd backend e siga as instruções)

1. Instale as dependências:

```bash
npm install
```

2. Crie e configure o arquivo `.env` com o conteúdo abaixo se ele não estiver disponivél:

```env
FIRESTORE_URL=https://firestore.googleapis.com/v1/projects/via-cep-234ca/databases/(default)/documents
```

> O arquivo `.env` dentro de src/ ele é essencial para a conexão com o Firestore e **não está incluído no repositório** por motivos de segurança.

3. Acesse o diretório `src/`:

```bash
cd src
```

4. Inicie o servidor:

```bash
node index.js
```

Você verá no terminal:

```
Servidor rodando em http://localhost:3000
```

---

### Na pasta Frontend

1. Em outro terminal, acesse a pasta do frontend:

```bash
cd frontend
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```





