# TCC - Projeto de Urna Eletrônica em Blockchain

Este projeto destina-se a implementar um sistema de urna eletrônica que utilize a tecnologia do Blockchain da Ethereum e contratos inteligentes com a linguagem Solidity.

# Instruções

### Iniciar o Projeto com o Docker

1. Rode o comando `docker-compose up -d --build` na pasta do projeto para subir o container
2. Para entrar no container, execute `docker-compose exec app sh`
3. Execute o comando `sh init.sh 1` para iniciar o projeto.

O projeto poderá ser acessado através da URL: http://localhost:8080

## Executar testes unitários

* Execute o comando `sh init.sh 2`

# Metamask

### Contas

```
0xedeaba9c96f82f94055e827f6091fe8fa076cdcd82b74e3eabaeeb580e7c6524
```
```
0xdaf9d566669832fc4659ff902d0191908e790c0a85cc262cda07bf55b4a68f92
```
```
0xea32b36b7dbdb7a45c1993c8ab63ef320554b1503c3d8526d68b20cc5c0cc3a4
```
```
0x1ab195d18fc1bae24cce8a205e455b5fb867418c29d86efc7a2d14fd52a7c92a
```
```
0x25afe14a9c253bbcce3aa54b4b6d8b17f6e5f434350e382adfec6fff8f51d0d2
```
```
0x493e96499b8cdb54b45a48bcdc303f2fd0a3ba786d88e34af4ca96380fdd6a1b
```
```
0x45382de1d9cf26271ad8ea11581e6c01c3a9210aad2e2633bfb295673a9c2df3
```
```
0xb4569937e446920703bd7659240d120482bd4a4f58d48afa4c84857899799240
```
```
0xe0f550a4819043ec6037c9ffcb0cb397d649c6ed91499748d828174cd5c5e398
```

### Instalação e configuração

1. Instalar a extensão do [Metamask](https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn) no navegador
2. Após instalar a extensão, se abrirá uma nova aba no navegador para configurar o metamask, clique no botão `Comece agora`, conforme a figura:

![image](https://user-images.githubusercontent.com/29721231/141219628-834e76cb-0a9b-4733-9ada-a4d7cb7433b2.png)

3. Clique em `Importar Carteira` para inserir a frase de recuperação:

![image](https://user-images.githubusercontent.com/29721231/141219829-aaf75a26-e949-493b-b2cb-1f3af4cdf3ce.png)

4. Se abrirá uma tela perguntando se concorda ou não com a coleta de informações afim de melhorar o metamask, fica a critério concordar ou não:

![image](https://user-images.githubusercontent.com/29721231/141220056-641a8209-4203-4edd-a8bd-8af3b2c79dde.png)

5. Na próxima tela, insira a frase de recuperação `oppose hold method produce usual uncle flee subway climb pottery run voyage` e a senha `Senh@tcc` e clique em `Importar`

![image](https://user-images.githubusercontent.com/29721231/141220399-17e9dbaf-15e6-43e8-9911-4d7f3278d5ae.png)

6. Clique no botão `Tudo pronto` e se abrirá a tela inicial do metamask. Nesta tela, clique no menu no canto superior direito `Mainnet do Ethereum` e mude para `Localhost 8545`

![image](https://user-images.githubusercontent.com/29721231/141220965-56dfc6a2-f620-483d-9bef-dc5bba7d057d.png)

9. A conta de administrador (Conta 1) será exibida na listagem

![image](https://user-images.githubusercontent.com/29721231/141221834-5c7207d8-c030-4067-8283-16a9445a8d3a.png)

10. Importe algumas contas de eleitor para utilizar o sistema de votação:
 - Copie o endereço de qualquer conta da listagem de contas, clique no usuário no menu superior direito, selecione a opção `Importar contas`  
![image](https://user-images.githubusercontent.com/29721231/141228861-3a7733ef-2578-4756-a990-3f14e0f2a515.png)

- Deixe o tipo como `Chave privada`, cole a chave copiada anteriormente no campo e clique em `Importar`  
![image](https://user-images.githubusercontent.com/29721231/141228814-47fded36-074e-426a-bd81-3182715b781e.png)


### Gerenciamento de Contas

Para mudar a conta utilizada no sistema, clique no ícone do metamask no navegador, selecione o menu do usuário e escolha o usuário desejado

![image](https://user-images.githubusercontent.com/29721231/141230187-a8237f32-f926-47a5-93c4-a3d30d09a5f0.png)








