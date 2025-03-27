# Sistema de Consultas Médicas

![Banner do Sistema](https://img.shields.io/badge/Sistema-Consultas_Médicas-27ae60?style=for-the-badge)

Um projeto de uma plataforma completa para agendamento de consultas médicas, integrando um frontend moderno em Next.js com backend robusto em NestJS e banco de dados PostgreSQL.

Gerenciado por Docker, o sistema é fácil de configurar e escalar. O frontend é construído com Next.js, proporcionando uma experiência de usuário fluida e responsiva. O backend utiliza NestJS, um framework poderoso para construir aplicações escaláveis e testáveis.
O banco de dados PostgreSQL garante a integridade e segurança dos dados, enquanto o Docker simplifica o processo de desenvolvimento e implantação.

Aproveitei a oportunidade para desenvolver em equipe, utilizando o git e github como ferramenta de colaboração, então gostaria de agradecer aos meus colega de equipe [GuizeraDan](https://github.com/GuizeraDan).

## 🛠️ Tecnologias Utilizadas

![TypeScript](https://img.shields.io/badge/language-TypeScript-3178C6?style=flat&logo=typescript) ![Next.js](https://img.shields.io/badge/frontend-Next.js-000000?style=flat&logo=next.js) ![NestJS](https://img.shields.io/badge/backend-NestJS-E0234E?style=flat&logo=nestjs) ![PostgreSQL](https://img.shields.io/badge/database-PostgreSQL-336791?style=flat&logo=postgresql) ![Docker](https://img.shields.io/badge/container-Docker-2496ED?style=flat&logo=docker) ![Git](https://img.shields.io/badge/-Git-000?style=flat&logo=git) ![GitHub](https://img.shields.io/badge/-GitHub-181717?style=flat&logo=github)

## 🔍 Visão Geral

O Sistema de Consultas Médicas é uma plataforma completa para gerenciar agendamentos de consultas médicas. Os pacientes podem pesquisar médicos por especialidade, visualizar avaliações, agendar consultas e gerenciar seus agendamentos. Os médicos podem visualizar e gerenciar seus horários e consultas agendadas.

### Principais Funcionalidades

✅ Cadastro de usuários
✅ Pesquisa de médicos por especialidade
✅ Visualização de horários disponíveis
✅ Agendamento de consultas

## 📦 Requisitos

Node.js 18.x ou superior
PostgreSQL 14.x ou superior
Docker e Docker Compose

## 🚀 Configuração de Desenvolvimento

### Configuração com Docker

Para iniciar o sistema completo com Docker:

#### Clone o repositório

```bash
git clone https://github.com/Danzokka/projeto-consultas.git
```

#### Navegue até o diretório do projeto

```bash
# Entre na pasta raiz do projeto
cd projeto-consultas

# Inicie os containers
docker compose up -d --build

# Para visualizar os logs
docker compose logs -f
```

Após o Docker compose montar toda a infraestrutura, você poderá acessar:

* Frontend: <http://localhost:3000>

* Backend: <http://localhost:5000>
