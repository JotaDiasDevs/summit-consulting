# 🏢 Summit Consulting

## 📋 Visão Geral

Summit Consulting é uma plataforma de gerenciamento desenvolvida com React, TypeScript, Vite e TailwindCSS durante o 2º semestre do curso de ADS.

## 👥 Integrantes do Projeto

- **João Victor Semente Dias** - RM: 562065 - Turma: 1TDSPY
- **Rodrigo Tiezzi** - RM: 562975 - Turma: 1TDSPY  
- **Christian de Souza Freitas** - RM: 566098 - Turma: 1TDSPY

## 🚀 Tecnologias

- React 19
- Vite 5
- TypeScript 5
- TailwindCSS 3
- React Router DOM
- React Hook Form
- json-server

## 📦 Como Instalar

```bash
npm install
```

## 🎯 Como Executar

### Terminal 1 - JSON Server (Desenvolvimento Local):
```bash
npm run json-server
```

### Terminal 2 - Projeto:
```bash
npm run dev
```

Acesse: http://localhost:5173

## 🔌 Configuração da API Java

Para integrar com a API Java remota, você precisa configurar a variável de ambiente `VITE_API_URL`.

### 1. Criar arquivo `.env` na raiz do projeto:

```env
# URL da sua API Java publicada
VITE_API_URL=https://sua-api-java.com/api

# Timeout opcional (padrão: 10000ms)
VITE_API_TIMEOUT=10000
```

### 2. Exemplos de URLs:

- **Heroku**: `https://sua-api.herokuapp.com/api`
- **Railway**: `https://sua-api.railway.app/api`
- **Render**: `https://sua-api.onrender.com/api`
- **Local**: `http://localhost:8080/api`

### 3. Após configurar, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```

### 4. Verificação:

No console do navegador (modo desenvolvimento), você verá a configuração da API sendo carregada.

**Nota**: O projeto está preparado para consumir APIs REST com os seguintes endpoints:
- `GET /usuarios` - Listar usuários
- `GET /usuarios/:id` - Buscar usuário por ID
- `POST /usuarios` - Criar usuário
- `PUT /usuarios/:id` - Atualizar usuário
- `DELETE /usuarios/:id` - Deletar usuário
- `GET /consultas` - Listar consultas
- `GET /consultas/:id` - Buscar consulta por ID
- `POST /consultas` - Criar consulta
- `PUT /consultas/:id` - Atualizar consulta
- `DELETE /consultas/:id` - Deletar consulta

## 🧪 Testar Login

Use um dos usuários pré-cadastrados:
- Username: `joao.silva` | Email: `joao.silva@email.com`
- Username: `maria.santos` | Email: `maria.santos@email.com`

Ou criar novo usuário na página de Cadastro!

## 🔗 Links

- GitHub: https://github.com/seu-usuario/summit-consulting
- Deploy: https://summit-consulting.vercel.app
- Vídeo: https://youtu.be/seu-video-id

## 📝 Funcionalidades

✅ 5 páginas públicas (Home, Sobre, Integrantes, FAQ, Contato)
✅ Sistema de autenticação (Login e Cadastro)
✅ Dashboard protegido
✅ API integration com json-server e suporte para API Java remota
✅ CRUD completo (GET, POST, PUT, DELETE) para Usuários e Consultas
✅ Tratamento robusto de erros HTTP com mensagens amigáveis
✅ Manipulação correta de dados com validação e tipagem
✅ Responsividade em 5 breakpoints
✅ TypeScript com tipos completos
✅ Validação com React Hook Form

## 📁 Estrutura de Pastas

```
src/
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── Layout.tsx
│   ├── ProtectedRoute.tsx
│   └── LoadingSpinner.tsx
├── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   ├── Integrantes.tsx
│   ├── FAQ.tsx
│   ├── Contact.tsx
│   ├── Login.tsx
│   ├── Cadastro.tsx
│   └── Dashboard.tsx
├── contexts/
│   └── AuthContext.tsx
├── services/
│   └── apiService.ts
├── types/
│   └── index.ts
├── App.tsx
├── main.tsx
└── index.css
```

## 🎓 Sprint 04 - 2º Semestre ADS

Desenvolvido para a disciplina de Desenvolvimento Web em 2025.

---

**Turma: 1TDSPY | FIAP - 2025**
