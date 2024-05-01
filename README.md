# API My Little School (Projeto em desenvolvimento para fins didáticos) 

## Introdução
Este é um projeto focado no cadastro e gerenciamento de alunos e colaboradores em escolas. O sistema é desenvolvido utilizando o framework NestJS,  Prisma ORM e TypeScript, oferecendo uma maneira fácil e segura de interagir com o banco de dados e utilizada o JWT como forma de autenticação.

## Principais funcionalidades
O sistema tem como objetivo principal facilitar o registro e a manutenção de informações relacionadas a alunos e colaboradores. As principais funcionalidades incluem:

### Alunos 
- Cadastrar novos alunos com informações como nome, RA (Registro Acadêmico), status e turma à qual pertencem.
  Os alunos podem ser associados a seus responsáveis
- Consulta os alunos registrados.


### Colaboradores 
- Cadastrar os colaboradores da escola, considerando a princípio apenas os funcionários administrativos.
  Os colaboradores são registrados com informações como nome, e-mail, telefone e privilégios de acesso ao sistema.
- Consultar dos colaboradores registrados.


### Gerenciamento de Turmas
- Cadastrar turmas, associando alunos a cada uma delas.
   As turmas são identificadas por nome e podem estar vinculadas a uma escola específica.


## Tecnologias Utilizadas
- **NestJS:** Framework que utiliza para Node.js.
- **Prisma:** ORM para Node.js e TypeScript, simplificando a interação com o banco de dados.
- **TypeScript:** Superconjunto tipado de JavaScript.

## Diagrama Entidade Relacionamento

![DER - My_little_school](https://github.com/thayvitareli/API-My-Little-School/assets/108371984/88d276ba-8d13-4428-aa53-17c197dc5fdc)

