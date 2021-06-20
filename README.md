# Wallet

Projeto desenvolvido em Angular Material 12.04. Uma aplicação simples de simulação de transferências financeiras.

# Pré-requisitos
Para utilizar este projeto, é necessário ter instalado em sua máquina:

- Node 14.17
- Angular Material 12.04

# Instalação
A instalação desta aplicação é feita de forma automatizada, juntamente com o backend, usando o Docker. Porém, caso queria instalar manualmente, deve-se seguir as seguintes etapas:

1. Faça o clone deste projeto usando o comando abaixo:
```bash
git clone https://github.com/FelipeMenezesDM/wallet.git
```
2. Acesse a pasta `/src/environments/` e crie um arquivo com o nome `init.js`. Neste arquivo deverá as constantes com as chaves de autenticação da OKTA, usada pelo backend para autenticar as requisições.
1. Copie o contéudo do arquivo init.example.js para o init.js, informando as chaves de autenticação.
1. Execute o `npm install`.
1. Inicie o servidor `ng serve --open`.
1. Siga o passo à passo para a instalação do backend neste link.

# Ambiente de testes
O ambiente de testes está disponpivel no [...].

Para acesso à aplicação, usar uma das credenciais abaixo:

| Usuário | Senha | Tipo
|--|--|--|
| usuario1 | teste123 | F |
| usuario3 | teste123 | F |
| usuario6 | teste123 | J |
| usuario8 | teste123 | F |
| usuario4 | teste123 | J |
| usuario7 | teste123 | F |
| usuario2 | teste123 | J |
| usuario9 | teste123 | F |
| usuario10 | teste123 | F |

Lembrando que, por conta da regra de negócio da aplicação, usuários do tipo "J", não podem realizar pagamentos, apenas recebê-los.
