# Place to know

## configurando o projeto
Para iniciar o projeto, é necessario criar um arquivo .env baseado no arquivo .env.example e preencher as variaveis de ambiente.

env | description
----| ---------
DB_USERNAME | usuario do banco de dados
DB_PASSWORD | senha do banco de dados
DB_NAME | nome do banco de dados
DB_TYPE | tipo do banco: mysql ou portgres. O sistema foi feito para rodar o pg, para rodar no mysql é necessario instalar a lib mysql no projeto
DB_HOST | o host está por padrão no .env.example o do docker, mas pode ser alterado
DB_PORT | porta do banco de dados
PORT | porta em que a aplicação irá rodar

## rodando o projeto
basicamente é necessario rodar o comando do docker-composer
`docker-compose up`