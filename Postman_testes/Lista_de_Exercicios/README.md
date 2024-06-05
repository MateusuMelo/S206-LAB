# Instruções para Teste e Relatório

Para executar os testes e gerar o relatório, siga os passos abaixo:

1. Abra o terminal (ou prompt de comando).
2. Navegue até o diretório onde esteja localizado o arquivo `Lista de Exercicios.postman_collection.json` e o arquivo `Lista de Exercicios.postman_environment.json`.
3. Execute o seguinte comando:

```sh
newman run '.\Lista de Exercicios.postman_collection.json' -e '.\Lista de Exercicios.postman_environment.json' -r htmlextra
