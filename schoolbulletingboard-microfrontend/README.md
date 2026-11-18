# Documentação Técnica — School Bulletin Board Microfrontend

## 1. Introdução

O School Bulletin Board Microfrontend é uma aplicação desenvolvida em React com foco em dispositivos móveis, integrada ao sistema School Bulletin Board.

O objetivo do projeto é disponibilizar uma interface mobile que permita a estudantes e professores acessar e interagir com as publicações da plataforma, oferecendo uma experiência de navegação simplificada, responsiva e adaptada a telas menores.

A aplicação foi desenvolvida como um microfrontend independente, permitindo que sua estrutura, dependências e ciclo de desenvolvimento sejam gerenciados separadamente da aplicação web principal.

## 2. Arquitetura da aplicação

A arquitetura escolhida foi a de uma aplicação React independente, desenvolvida seguindo a abordagem Mobile First.

O microfrontend possui seu próprio ambiente de desenvolvimento, estrutura de componentes, gerenciamento de rotas e configuração visual.

Sua comunicação com o restante do sistema acontece por meio de requisições HTTP aos endpoints REST disponibilizados pelo backend.

### 2.1 Tecnologias utilizadas

- **React:** biblioteca utilizada para construção da interface.
- **TypeScript:** utilizado para tipagem estática e maior previsibilidade no desenvolvimento.
- **Material UI:** biblioteca de componentes utilizada na construção da interface e padronização visual.
- **React Router DOM:** gerenciamento de rotas e navegação entre páginas.
- **Axios:** comunicação com os endpoints REST.
- **Docker e Docker Compose:** gerenciamento e execução do ambiente de desenvolvimento.
- **Vite:** ferramenta utilizada para desenvolvimento e execução da aplicação.

### 2.2 Organização da arquitetura

A aplicação foi estruturada em componentes reutilizáveis e páginas independentes.

A organização contempla:

- **Pages:** páginas principais da aplicação.
- **Components:** componentes reutilizáveis da interface.
- **API:** serviços responsáveis pelas requisições ao backend.
- **Contexts:** gerenciamento de estados globais, especialmente autenticação.
- **Routes:** configuração da navegação e proteção de páginas.
- **Theme:** configuração global do Material UI.

Essa organização facilita a manutenção, a reutilização de código e a evolução independente da aplicação.

## 3. Funcionalidades desenvolvidas

### 3.1 Página inicial

A página inicial apresenta as publicações disponíveis na plataforma.

Suas funcionalidades incluem:
- Listagem de publicações.
- Exibição de informações resumidas dos posts.
- Busca de publicações por título.
- Navegação para os detalhes de uma publicação.

### 3.2 Detalhes das publicações

A página de detalhes permite visualizar o conteúdo completo de uma publicação, incluindo título, conteúdo, autor e informações de criação.

Também apresenta ações de gerenciamento quando o usuário autenticado é o professor responsável pela publicação.

### 3.3 Criação e edição de publicações

Foi desenvolvido um formulário reutilizável para criação e edição de posts.

Os campos disponíveis são:
- Título.
- Conteúdo.
- Status da publicação.

A reutilização do formulário evita duplicação de código e mantém a consistência entre as operações.

### 3.4 Autenticação e perfil

A aplicação possui uma página de login integrada ao mecanismo de autenticação do backend.

O gerenciamento da autenticação é realizado por meio do Context API, permitindo compartilhar informações do usuário entre diferentes componentes.

As funcionalidades incluem:
- Login.
- Logout.
- Exibição das informações do usuário no perfil.
- Controle de acesso baseado em permissões.
- Exclusão da própria conta.

### 3.5 Listagem de usuários

A aplicação também contempla páginas de consulta de alunos e professores.

As permissões são diferenciadas conforme o perfil:

| Funcionalidade | Aluno | Professor |
|---|---|---|
| Visualizar alunos | Sim | Sim |
| Visualizar professores | Não | Sim |
| Criar publicações | Não | Sim |
| Editar próprias publicações | Não | Sim |
| Excluir próprias publicações | Não | Sim |

As listagens de usuários são destinadas exclusivamente à consulta.

## 4. Responsividade e experiência do usuário

O desenvolvimento foi realizado seguindo a abordagem Mobile First, priorizando a experiência em dispositivos móveis.

A interface utiliza componentes do Material UI, permitindo manter uma identidade visual consistente e facilitar a adaptação dos elementos para diferentes resoluções.

A navegação principal utiliza uma barra inferior com acesso às principais áreas da aplicação, facilitando a utilização em dispositivos com telas menores.

Também foram utilizados componentes reutilizáveis para manter a consistência visual entre as páginas.

## 5. Integração com o backend

O microfrontend consome os serviços disponibilizados pelo backend por meio de requisições HTTP utilizando Axios.

A comunicação contempla operações de consulta, criação, atualização e exclusão de publicações, além de autenticação e gerenciamento de usuários.

A autenticação utiliza tokens JWT, enviados nas requisições protegidas por meio do cabeçalho Authorization.

A separação entre a interface e os serviços de API permite manter a aplicação desacoplada da implementação interna do backend.

## 6. Segurança e controle de acesso

O controle de acesso considera os diferentes perfis existentes na aplicação: STUDENT e TEACHER.

O frontend utiliza rotas protegidas para impedir que usuários acessem páginas incompatíveis com suas permissões.

Além disso, as ações de gerenciamento de publicações são disponibilizadas conforme a autoria da publicação.

A validação definitiva das permissões é realizada pelo backend, evitando que a segurança dependa exclusivamente das restrições da interface.

## 7. Ambiente de desenvolvimento e Docker

O microfrontend foi integrado ao ambiente Docker Compose do projeto, mantendo seu próprio serviço e configuração de execução.

A aplicação utiliza a porta 5174, enquanto o backend disponibiliza seus serviços na porta 3000.

Essa configuração permite executar o microfrontend e as demais aplicações simultaneamente, mantendo seus ambientes independentes.

Durante o desenvolvimento, também foi configurado o monitoramento de alterações nos arquivos para facilitar o processo de atualização da aplicação.

## 8. Experiências e desafios enfrentados

Durante o desenvolvimento, alguns desafios técnicos exigiram investigação e ajustes na arquitetura.

### 8.1 Comunicação entre containers

Um dos primeiros desafios foi configurar corretamente a comunicação entre o microfrontend e o backend dentro do ambiente Docker.

Foram encontrados problemas relacionados a portas, redes Docker, endereçamento dos serviços e configuração de CORS.

Essas situações exigiram uma revisão da configuração do Docker Compose e da comunicação entre os serviços.

### 8.2 Integração com a API

Durante a integração, ocorreram situações em que as requisições retornavam conteúdos inesperados, como páginas HTML do servidor Vite em vez dos dados JSON esperados.

Também foram encontrados erros de gateway e problemas de conexão com o backend.

Essas experiências demonstraram a importância de verificar não apenas o status HTTP, mas também o formato e a estrutura dos dados recebidos.

### 8.3 Autenticação e gerenciamento de estado

Outro desafio foi integrar o processo de login ao gerenciamento global de estado do React.

Foi necessário organizar o acesso às informações do usuário, disponibilizar os dados de autenticação entre as páginas e implementar mecanismos de proteção de rotas.

Também foi necessário garantir que as informações do usuário fossem utilizadas corretamente nas operações que dependem de permissões.

### 8.4 Ambiente Docker e hot reload

A configuração do ambiente de desenvolvimento apresentou dificuldades relacionadas ao monitoramento de alterações nos arquivos dentro dos containers.

Foram necessários ajustes nas configurações de Nodemon, TypeScript e Docker para permitir que as alterações no backend fossem identificadas durante o desenvolvimento.

Também foram encontrados problemas relacionados à geração do Prisma Client em ambientes Windows e Linux, exigindo ajustes nos binários utilizados pelo ambiente de execução.

### 8.5 Desenvolvimento Mobile First

A construção de uma interface independente para dispositivos móveis exigiu atenção à disposição dos elementos, navegação e reutilização de componentes.

A utilização do Material UI contribuiu para padronizar a interface e acelerar a implementação das páginas.

## 9. Conclusão

O desenvolvimento do School Bulletin Board Microfrontend permitiu aplicar conhecimentos relacionados à construção de aplicações React, integração com APIs REST, gerenciamento de estado, autenticação e conteinerização.

A escolha de uma arquitetura independente possibilitou desenvolver uma experiência específica para dispositivos móveis sem acoplar diretamente a interface à aplicação web principal.

Durante o desenvolvimento, os desafios relacionados à comunicação entre serviços, autenticação e configuração do ambiente contribuíram para aprofundar o entendimento sobre aplicações distribuídas e organização de projetos frontend.

Como possíveis evoluções futuras, destacam-se a implementação de notificações, melhorias na experiência de navegação, otimização de carregamento e ampliação das funcionalidades disponíveis na versão mobile.