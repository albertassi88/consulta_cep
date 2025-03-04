# Consulta de CEP

Este projeto é uma aplicação React com TypeScript e TailwindCSS que permite ao usuário consultar endereços via API do ViaCEP, armazená-los localmente e listá-los.

---

## Instruções de instalação e execução

Siga os passos abaixo para instalar e executar o projeto localmente.

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 16 ou superior)
- [npm](https://www.npmjs.com/) (gerenciador de pacotes)

### Passo a passo

1. **Clone o repositório**:
  - git clone https://github.com/albertassi88/consulta_cep.git

2. **Instale as dependências:**
  - npm install

3. **Execute o projeto:**
  - npm start

4. **Acesse a aplicação:**
  - http://localhost:3000

### Decisões técnicas adotadas

## Tecnologias utilizadas

- **React**: Escolhido por sua popularidade, facilidade de uso e grande comunidade.
- **TypeScript**: Adotado para adicionar tipagem estática ao projeto, melhorando a segurança e a manutenibilidade do código.
- **TailwindCSS**: Utilizado para estilização rápida e consistente, com foco em utilitários CSS.
- **API ViaCEP**: Escolhida por ser gratuita, confiável e de fácil integração.

## Estrutura do projeto

- **Componentização**: O projeto foi dividido em componentes reutilizáveis, como `AddressForm` (formulário de consulta) e `AddressList` (listagem de endereços).
- **Gerenciamento de estado**: O estado da aplicação foi gerenciado usando `useState` do React, sem a necessidade de bibliotecas externas como Redux ou Context API.
- **Armazenamento local**: Os endereços consultados são armazenados no `localStorage` para persistência dos dados mesmo após recarregar a página.

## Cache de consultas

- Para evitar consultas desnecessárias à API, foi implementado um **cache local** que armazena os endereços já consultados. Se o usuário digitar um CEP que já foi pesquisado anteriormente, os dados são recuperados do cache em vez de fazer uma nova requisição.

## Design responsivo

- O layout foi desenvolvido com **TailwindCSS**, garantindo que a aplicação seja totalmente responsiva.

