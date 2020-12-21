# ENIGMA - Backend

Enigma é um software de quiz gamificado desenvolvido como projeto final da disciplina de TAE (Tecnologias Aplicadas à Educação) do curso de Sistemas de Informação da UNIFESSPA. 
Utilizamos como base o jogo Dota 2 para desenvolver a temática da gamificação, como pontos, competição e etc, o software não foi totalmente finalizado durante a disciplina, no momento possui as seguintes funcionalidades implementadas.

## Funcionalidades

- Autenticação de usuários (Cadastro de logon)
- Diferenciação de papéis, professor e aluno.
- **Professor**
  - Criar questionários
  - Vincular alunos (através do e-mail) aos questionários, distribuindo eles entre 2 times, Iluminados e Temidos.
  - Aprovar questões criadas pelos alunos para comporem o questionário.
  - Iniciar questionário
- **Aluno**
  - Cadastrar questões e alternativas em um questionário.
  - Responder questionário
  - Visualizar a sua pontuação no questionário.

## Tecnologias

O Quiz Enigma foi desenvolvido utilizando as tecnologias:

- [React Js](https://reactjs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Node Js](http://nodejs.org/)
- [MySql](https://www.mysql.com/)

## Repositórios

O software é dividido em uma api backend, que possui as regras de negócio e conexão com o banco de dados e o frontend, desenvolvido em React Js e se trata da interface de usuário.
- [Backend](https://github.com/tae-enigma/quiz-backend/)
- [Frontend](https://github.com/tae-enigma/quiz-frontend/)

## Protótipos de tela
- [Figma](https://www.figma.com/file/eyjrVtezNcWbsOrxU5Iz52/Wireframe-TAE-ENIGMA?node-id=0%3A1)


## Autores

- Michel Victor - Desenvolvedor Backend - [Github](https://github.com/michvic)
- Rafael Tavares - Desenvolvedor Backend - [Github](https://github.com/RRTavares)
- Gustavo Felipe - Desenvolvedor Frontend e UI Designer - [Github](https://github.com/gustavofbc)
- José Vinícius - Desenvolvedor FullStack e UI Designer - [Github](https://github.com/saraivavini)


## Configurações

### ESLint

Para permitir a correção automática do ESLint no seu VS Code.

1. Use o comando CTRL+SHIFT+P e busque por "Preferences: Open Settings (JSON)"
2. Copie e cole o código:

```JSON
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
```

### Como Rodar

### Backend

1. Duplicar o documento `.example.env` e renomear a cópia para `.env`.
2. Preencher as variáveis do `.env` com as informações do banco de dados.
3. Criar um Banco de Dados MySql com o nome `tae_quiz`.
4. Executar `yarn` ou `npm install` no pasta raiz do repositório.
5. Executar o comando `yarn migrate:run` ou `npm run migrate:run` para executar as migrations e criar as tabelas no banco de dados.
6. Executar `yarn dev:server` para executar a api.

### Frontend

1. Executar `yarn` ou `npm install` no pasta raiz do repositório.
2. Executar no terminal `yarn start` para iniciar a aplicação..
