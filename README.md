# API My Little School (Projeto em desenvolvimento para fins didáticos) 

## Introdução
Este é um projeto focado no cadastro e gerenciamento de alunos e colaboradores em escolas de ensino fundamental. O sistema é desenvolvido utilizando o framework NestJS,  Prisma ORM e TypeScript, oferecendo uma maneira fácil e segura de interagir com o banco de dados e utilizada o JWT como forma de autenticação.

## Principais funcionalidades
O sistema tem como objetivo principal facilitar o registro e a manutenção de informações relacionadas a alunos e colaboradores em escolas de ensino fundamental. As principais funcionalidades incluem:

### Cadastro e consulta de Alunos 
- Permitirá o cadastro de novos alunos, incluindo informações como nome, RA (Registro Acadêmico), status e turma à qual pertencem.
- Os alunos podem ser associados a seus responsáveis
- Permitirá a consulta dos alunos registrados.


### Cadastro de Colaboradores e consulta de colaboradores
- Permite o registro de colaboradores da escola, considerando a princípio apenas os funcionários administrativos.
- Os colaboradores são registrados com informações como nome, e-mail, telefone e privilégios de acesso ao sistema.
- Permite a consulta dos colaboradores registrados.


### Gerenciamento de Turmas
- Permite a criação e gerenciamento de turmas, associando alunos a cada uma delas.
- As turmas são identificadas por nome e podem estar vinculadas a uma escola específica.


## Tecnologias Utilizadas
- **NestJS:** Framework que utiliza para Node.js.
- **Prisma:** ORM para Node.js e TypeScript, simplificando a interação com o banco de dados.
- **TypeScript:** Superconjunto tipado de JavaScript.


